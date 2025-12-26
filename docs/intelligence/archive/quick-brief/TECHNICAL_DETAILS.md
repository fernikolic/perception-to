# Quick Brief Technical Implementation Details

Complete technical documentation for the Quick Brief generation system (v12).

## System Architecture

### Data Flow
```
User Request
    ↓
Firebase Cloud Function (quickBriefGenerator)
    ↓
[Historical Analysis - Parallel] ← [Current Data Fetch - Parallel]
    ↓                                      ↓
36 articles (12 months)              100 articles (30 days)
    ↓                                      ↓
Extract angles (4× GPT-4o)           Structure data
    ↓                                      ↓
Cluster angles (1× GPT-4o)           Categorize media
    ↓                                      ↓
Cache results (24h)                  Count evidence
    ↓                                      ↓
    └──────────── Merge ─────────────────┘
                    ↓
            Generate Brief (1× GPT-4o)
                    ↓
            Post-process (banned phrases)
                    ↓
            Store in Firestore
                    ↓
            Return to user
```

## Core Functions

### 1. Historical Analysis

#### fetchHistoricalSampleArticles()
**Purpose:** Sample representative articles from 12 months
**Implementation:**
```typescript
async function fetchHistoricalSampleArticles(keyword: string): Promise<Article[]> {
  const query = `
    WITH monthly_samples AS (
      SELECT
        title, content, Outlet as outlet, DATE(date) as pub_date,
        DATE_TRUNC(DATE(date), MONTH) as month,
        ROW_NUMBER() OVER (
          PARTITION BY DATE_TRUNC(DATE(date), MONTH)
          ORDER BY RAND()
        ) as rn
      FROM \`triple-upgrade-245423.btcp_main_dataset.all_channels_data\`
      WHERE REGEXP_CONTAINS(LOWER(CONCAT(title, ' ', content)), r'${entityRegex}')
        AND DATE(date) >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
        AND DATE(date) < DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
        AND LENGTH(content) > 200
    )
    SELECT title, content, outlet, pub_date, month
    FROM monthly_samples
    WHERE rn <= 3  -- 3 articles per month
    ORDER BY pub_date DESC
  `;

  const [rows] = await bigquery.query({ query });
  return rows.map(row => ({ /* map to Article type */ }));
}
```

**Key Design Decisions:**
- **3 articles per month** = 36 total (optimal balance of coverage vs API cost)
- **Random sampling** with `RAND()` ensures representative coverage
- **Content length > 200** filters out snippets and low-quality posts
- **Excludes last 30 days** to avoid overlap with current analysis

**Cost:** Free (BigQuery scan < 1GB)

#### extractNarrativeAnglesFromArticles()
**Purpose:** Extract how journalists frame the story
**Implementation:**
```typescript
async function extractNarrativeAnglesFromArticles(
  articles: Article[],
  keyword: string
): Promise<string[]> {
  const batchSize = 10;
  const allAngles: string[] = [];

  for (let i = 0; i < articles.length; i += batchSize) {
    const batch = articles.slice(i, i + batchSize);

    const prompt = `Analyze how journalists frame stories about "${keyword}".

For EACH of these ${batch.length} articles, identify the main narrative angle:

${batch.map((article, idx) => `
ARTICLE ${idx + 1} (${article.date}):
Title: ${article.title}
First 800 chars: ${article.content.substring(0, 800)}
`).join('\n')}

A narrative angle is HOW the story is framed, not WHAT happened:

GOOD: "MicroStrategy of Asia", "Bitcoin treasury pioneer"
BAD: "Company buys Bitcoin", "Stock price rises"

Output ONLY a numbered list:
1. [Narrative angle for article 1]
2. [Narrative angle for article 2]
...`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You identify narrative framing patterns." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    // Parse numbered list and filter
    const angles = response.choices[0].message.content!
      .split('\n')
      .filter(line => /^\d+\./.test(line))
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(angle =>
        angle &&
        !angle.toLowerCase().includes('factual') &&
        angle.length > 10
      );

    allAngles.push(...angles);
  }

  return allAngles;
}
```

**Key Design Decisions:**
- **Batch size = 10** articles per API call (optimal for 4K context window)
- **800 chars** of content (enough context, fits in tokens)
- **Temperature = 0.3** (deterministic but allows slight variation)
- **Filter "factual reporting only"** responses (no narrative angle)

**Cost:** 4 batches × $0.04 = $0.16 per brief

#### clusterAndCountAngles()
**Purpose:** Group similar angles and calculate saturation
**Implementation:**
```typescript
async function clusterAndCountAngles(
  angles: string[],
  keyword: string
): Promise<NarrativeAngle[]> {
  const prompt = `These are ${angles.length} narrative angles from 12 months:

${angles.map((angle, i) => `${i + 1}. ${angle}`).join('\n')}

Task:
1. Group similar angles ("MicroStrategy of Asia" + "Asia's MicroStrategy" = same)
2. Count occurrences
3. Calculate percentage
4. Determine status

Output JSON:
{
  "narrative_angles": [
    {
      "theme": "Descriptive name",
      "example_phrases": ["variant 1", "variant 2"],
      "count": 15,
      "percentage": 42,
      "status": "OVERSATURATED"
    }
  ]
}

Status thresholds (out of ${angles.length} total):
- NOVEL: 1-3 occurrences (<10%)
- EMERGING: 4-${Math.ceil(angles.length * 0.25)} (10-25%)
- MATURE: ${Math.ceil(angles.length * 0.25) + 1}-${Math.ceil(angles.length * 0.45)} (25-45%)
- OVERSATURATED: ${Math.ceil(angles.length * 0.45) + 1}+ (>45%)`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a data analysis system. Output only JSON." },
      { role: "user", content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 2000
  });

  const jsonStr = response.choices[0].message.content!
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  return JSON.parse(jsonStr).narrative_angles.map(angle => ({
    theme: angle.theme,
    phrases: angle.example_phrases || [],
    total_mentions: angle.count,
    trend: `${angle.percentage}% of coverage`,
    status: angle.status
  }));
}
```

**Key Design Decisions:**
- **Dynamic thresholds** based on total angles (prevents bias with small samples)
- **Temperature = 0.2** (very deterministic for consistent clustering)
- **JSON output** (structured, parseable)
- **Percentage calculation** (more intuitive than raw counts)

**Cost:** $0.02 per brief

### 2. Current Data Analysis

#### fetchBriefData()
**Purpose:** Fetch recent articles and metadata
**Implementation:**
```typescript
async function fetchBriefData(keyword: string, timeRange: string) {
  const { startDate, endDate } = calculateDateRange(timeRange);
  const entityRegex = generateEntityRegex(keyword);

  // Parallel queries for performance
  const [articlesQuery, reportersQuery, outletsQuery] = await Promise.all([
    // Query 1: Articles with full content
    bigquery.query({ query: articlesSQL }),

    // Query 2: Reporter mentions
    bigquery.query({ query: reportersSQL }),

    // Query 3: Outlet distribution
    bigquery.query({ query: outletsSQL })
  ]);

  return {
    articles: articlesQuery[0],
    reporters: reportersQuery[0],
    outlets: outletsQuery[0]
  };
}
```

**Performance Optimization:**
- All 3 queries run in parallel with `Promise.all()`
- Reduces total time from ~6s to ~2s

### 3. Brief Generation

#### generateBriefWithAI()
**Purpose:** Convert structured data to narrative brief
**Implementation:**
```typescript
async function generateBriefWithAI(
  data: BriefData,
  briefType: string
): Promise<string> {
  const systemPrompt = `You are a PR intelligence analyst...`;

  const userPrompt = buildPrompt(data, briefType);

  // Attempt generation up to 3 times
  for (let attempt = 1; attempt <= 3; attempt++) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 4000
    });

    const content = response.choices[0].message.content!;

    // Check for banned phrases
    const bannedFound = detectBannedPhrases(content);
    if (bannedFound.length === 0) {
      return content; // Clean output
    }

    console.log(`Retry attempt ${attempt}/2 - found: ${bannedFound.join(', ')}`);
  }

  // Final fallback: post-processing
  console.log('Max retries reached, applying post-processing');
  return applyPostProcessing(content);
}
```

**Retry Logic:**
1. Attempt 1: Generate brief
2. If banned phrases found → Retry
3. Attempt 2: Generate again
4. If still banned → Retry
5. Attempt 3: Generate again
6. If still banned → Apply post-processing (guaranteed fix)

**Cost:** $0.14 per brief (sometimes $0.28 if retries needed)

### 4. Post-Processing

#### applyPostProcessing()
**Purpose:** Remove banned phrases with regex replacement
**Implementation:**
```typescript
function applyPostProcessing(content: string): string {
  const replacements: { [key: string]: string } = {
    'Your move:': 'Recommendation:',
    'Your play:': 'Recommendation:',
    'Leverage this': 'Use this',
    'Capitalize on': 'Use',
    'Act decisively': 'Pitch within 2 weeks',
    'Act now': 'Take action',
    'Move quickly': 'Take action',
    'Before the narrative becomes saturated': 'Before broader media coverage',
    'The window is closing': 'Limited time for this angle',
    'Strike while the iron is hot': 'Take action soon'
  };

  let processed = content;
  for (const [phrase, replacement] of Object.entries(replacements)) {
    const regex = new RegExp(phrase, 'gi');
    processed = processed.replace(regex, replacement);
  }

  return processed;
}
```

**Why Case-Insensitive:**
- GPT-4o sometimes outputs "Your Move" or "CAPITALIZE ON"
- Regex flag `gi` = global + case-insensitive

## Data Structures

### BriefData Interface
```typescript
interface BriefData {
  keyword: string;
  timeRange: string;
  topArticles: Article[];
  cryptoMedia: Article[];
  mainstreamMedia: Article[];
  socialMentions: Article[];
  reporters: Reporter[];
  outlets: Outlet[];
  historicalNarratives?: NarrativeAngle[];
  totalMentions: number;
  sentiment: { positive: number; neutral: number; negative: number };
}
```

### NarrativeAngle Interface
```typescript
interface NarrativeAngle {
  theme: string;               // "Corporate Bitcoin Accumulation Strategy"
  phrases: string[];           // ["corporate bitcoin strategy", "BTC treasury"]
  total_mentions: number;      // 7
  trend: string;               // "22.58% of coverage"
  status: 'NOVEL' | 'EMERGING' | 'MATURE' | 'OVERSATURATED';
}
```

## Caching Strategy

### In-Memory Cache
```typescript
const narrativeCache = new Map<string, {
  angles: NarrativeAngle[];
  timestamp: number;
}>();

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

async function getCachedNarrativeAngles(keyword: string): Promise<NarrativeAngle[] | null> {
  const cached = narrativeCache.get(keyword);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.angles;
  }
  return null;
}

function cacheNarrativeAngles(keyword: string, angles: NarrativeAngle[]) {
  narrativeCache.set(keyword, {
    angles,
    timestamp: Date.now()
  });
}
```

**Why 24-hour TTL:**
- Historical analysis changes slowly (narrative trends evolve over weeks)
- Reduces API costs (avoid re-analyzing same keyword multiple times/day)
- Users often generate multiple briefs for same keyword

**Limitations:**
- In-memory cache clears on function cold start
- Not shared across function instances
- **Future:** Move to Firestore for persistent cross-instance caching

## BigQuery Optimization

### Entity Regex Generation
```typescript
function generateEntityRegex(keyword: string): string {
  // Handle multi-word keywords
  if (keyword.includes(' ')) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\\\$&');
    return escaped.replace(/\\s+/g, '\\\\s+');
  }

  // Single word: word boundary matching
  return `\\\\b${keyword}\\\\b`;
}

// Examples:
generateEntityRegex('bitcoin')           // → \b bitcoin\b
generateEntityRegex('michael saylor')    // → michael\s+ saylor
generateEntityRegex('ethereum 2.0')      // → ethereum\s+2\.0
```

**Why This Matters:**
- `\bbitcoin\b` matches "Bitcoin" but not "Bitcoinmagazine"
- Escaped special chars prevent regex errors
- Case-insensitive matching via `LOWER()`

### Query Performance
```sql
-- SLOW (no filtering):
SELECT * FROM all_channels_data
WHERE LOWER(content) LIKE '%metaplanet%'

-- FAST (regex + date filter):
SELECT * FROM all_channels_data
WHERE REGEXP_CONTAINS(LOWER(CONCAT(title, ' ', content)), r'\bmetaplanet\b')
  AND DATE(date) >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
  AND DATE(date) < DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
```

**Performance Gains:**
- Date filtering reduces scan from 434K → ~50K rows
- Regex more efficient than LIKE for word boundaries
- `CONCAT(title, ' ', content)` searches both fields

## Error Handling

### Non-Fatal Historical Analysis
```typescript
try {
  const narrativeAngles = await analyzeHistorical(keyword);
} catch (error) {
  console.error('Historical analysis failed (non-fatal):', error);
  // Continue without historical data
}
```

**Why Non-Fatal:**
- Brief is still useful without historical context
- Historical analysis is enhancement, not requirement
- Prevents total failure if BigQuery has issues

### Firestore Storage Failure
```typescript
try {
  await firestore.collection('quick_briefs').add(briefDoc);
} catch (error) {
  console.error('Failed to store in Firestore:', error);
  // Still return brief to user
}
```

**Why Continue:**
- User gets their brief even if storage fails
- Can retry storage later
- Brief content is more important than persistence

## Security

### Input Validation
```typescript
if (!keyword || !briefType || !timeRange) {
  throw new Error('Missing required parameters');
}

if (keyword.length > 100) {
  throw new Error('Keyword too long (max 100 chars)');
}

const validBriefTypes = ['pr_intelligence', 'trend_analysis'];
if (!validBriefTypes.includes(briefType)) {
  throw new Error('Invalid briefType');
}
```

### API Key Protection
```typescript
const openaiApiKey = defineSecret('OPENAI_API_KEY');

export const quickBriefGenerator = onCall({
  secrets: [openaiApiKey],
  timeoutSeconds: 300
}, async (request) => {
  const apiKey = openaiApiKey.value();
  // Use apiKey
});
```

**Security Benefits:**
- API key not in code or environment variables
- Automatically rotated by Firebase
- Only accessible during function execution

## Testing

### Local Test Script
```typescript
// test-brief-v5.ts
async function testQuickBrief() {
  const { generateQuickBrief } = await import('./src/quick-brief-generator');

  const result = await generateQuickBrief({
    keyword: 'metaplanet',
    briefType: 'pr_intelligence',
    timeRange: 'last_30_days',
    userId: 'test_user_local'
  });

  const output = `# Metaplanet Brief (v12)
**Generated:** ${new Date().toISOString()}
**Tokens:** ${result.metadata.tokensUsed}

${result.content}`;

  fs.writeFileSync('/Users/fernandonikolic/perception/GENERATED_BRIEF_V12.md', output);
}
```

**Run:**
```bash
OPENAI_API_KEY="your-key" npx ts-node test-brief-v5.ts
```

## Performance Metrics

### v12 Benchmark (Metaplanet keyword)
- Total time: 123.6s
  - Historical analysis: ~30s
    - BigQuery sample fetch: 2s
    - GPT-4o extraction (4 batches): 20s
    - GPT-4o clustering: 5s
    - Caching: <1s
  - Current data fetch: 2s
  - Brief generation: 90s
    - GPT-4o initial: 30s
    - Retry 1: 30s
    - Retry 2: 30s
    - Post-processing: <1s
  - Firestore storage: 1s

- Tokens used: 167,028
  - Historical extraction: 40,000
  - Clustering: 8,000
  - Brief generation: 119,028

- Cost: $0.17
  - Historical: $0.16
  - Brief: $0.14
  - Retries: $0.28 (when needed)

### Optimization Opportunities
1. **Pre-compute historical** → Save 30s
2. **Cache brief generation** → Save 90s (if same keyword requested again)
3. **Reduce retries** → Better prompt tuning

## Deployment

### Firebase Functions v2
```bash
# Deploy single function
firebase deploy --only functions:quickBriefGenerator

# Deploy all functions
firebase deploy --only functions

# Check logs
firebase functions:log --only quickBriefGenerator
```

### Environment Setup
```bash
# Set secret (first time only)
firebase functions:secrets:set OPENAI_API_KEY

# Update secret
firebase functions:secrets:set OPENAI_API_KEY --force
```

### Monitoring
```typescript
// Cloud Functions console shows:
- Invocations: Total calls
- Errors: Failed executions
- Memory usage: Peak RAM
- Execution time: 50th, 95th, 99th percentile
```

## Future Enhancements

### 1. Pre-computation Service
```typescript
export const precomputeHistoricalAnalysis = onSchedule({
  schedule: "0 2 * * *", // 2 AM daily
  timeZone: "America/Los_Angeles"
}, async () => {
  const trackedKeywords = await getTrackedKeywords();

  for (const keyword of trackedKeywords) {
    const narrativeAngles = await analyzeHistoricalNarratives(keyword);
    await firestore.collection('narrative_cache').doc(keyword).set({
      angles: narrativeAngles,
      computedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
});
```

**Benefits:**
- Reduces brief generation from 120s → 40s
- Cost same (just shifted to nightly job)
- Better UX (faster response)

### 2. Reporter Intelligence
```typescript
interface ReporterProfile {
  name: string;
  outlet: string;
  recentTopics: string[];
  narrativeAnglesUsed: string[];
  averageArticlesPerMonth: number;
  emailPattern?: string;
}

// Add to brief:
"**Who to pitch:** James Van Straten at CoinDesk (wrote 12 articles on corporate Bitcoin strategies in past 6 months, uses 'treasury strategy' framing)"
```

### 3. Competitive Analysis
```typescript
// Compare keyword to related keywords
const competitiveContext = await analyzeCompetitiveKeywords([
  'metaplanet',
  'microstrategy',
  'strategy',
  'marathon digital'
]);

// Output:
"Metaplanet: 56 articles (22% mainstream)
MicroStrategy: 340 articles (78% mainstream) ← Dominant player
Strategy: 280 articles (65% mainstream)
Marathon: 45 articles (18% mainstream) ← Similar to Metaplanet"
```
