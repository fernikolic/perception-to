# TEMPLATE SYSTEM VISION
**Super-Detailed Prompt Engineering for Expert-Level Analysis**

**Date:** October 11, 2025
**Purpose:** Clarify what templates actually are and should contain

---

## WHAT TEMPLATES REALLY ARE

Templates are **NOT** static report generators with variable substitution.

Templates are **HIGHLY DETAILED PROMPTS** that teach OpenAI to be an **expert analyst** for each persona, including:

1. ✅ **How to read BigQuery data** (schema, field meanings, data structure)
2. ✅ **How to interpret the data** (what 7 days means, how to spot trends, what matters)
3. ✅ **What analysis to perform** (sentiment calculation, theme extraction, competitive positioning)
4. ✅ **What insights this persona cares about** (C-suite wants strategic risks, PR wants media angles)
5. ✅ **How to present findings** (format, structure, tone, language)
6. ✅ **What NOT to include** (forbidden language, irrelevant insights)

---

## EXAMPLE: STAKEHOLDER COMMUNICATIONS TEMPLATE

### Current Working Template (from quick-brief-generator.ts)

This is **GOOD** - it's detailed and works:

```typescript
const prompt = `Generate a professional STAKEHOLDER COMMUNICATIONS BRIEF for ${data.topic}.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRITICAL INSTRUCTIONS - READ CAREFULLY:

This is a STAKEHOLDER INTELLIGENCE BRIEF for board members, investors, and executive
leadership - NOT a PR or marketing document.

YOUR ROLE:
You are a strategic media intelligence analyst providing objective analysis for
executive decision-makers. Your output will be read by CEOs, CFOs, board members,
and investors who need to understand market perception and competitive positioning.

STRICTLY FORBIDDEN - DO NOT INCLUDE UNDER ANY CIRCUMSTANCES:
❌ Journalist outreach recommendations ("Pitch to...", "Contact...", "Target...")
❌ PR tactics or media relationship advice
❌ Campaign planning or communications strategies
❌ Action items related to PR or media outreach
❌ Newsjacking opportunities

INSTEAD, YOU MUST FOCUS ON:
✅ Market perception and sentiment trends
✅ Competitive narrative positioning
✅ Strategic risks and opportunities in coverage
✅ Business implications and stakeholder value
✅ Objective analysis of media coverage patterns

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DATA YOU ARE ANALYZING:

TIME RANGE: ${data.timeRange} (this is the period being analyzed)

METRICS:
- Total: ${totalMentions} articles, ${uniqueOutlets} outlets
- Sentiment: ${positivePct}% positive, ${neutralPct}% neutral, ${negativePct}% negative
- Time Range: ${data.timeRange}

ARTICLES:
${articlesSummary}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GENERATE THE FOLLOWING FORMAT:

# STAKEHOLDER COMMUNICATIONS BRIEF
## ${data.topic} Media & Narrative Intelligence

[Executive Summary - 3-4 sentences focusing on strategic overview]
[Media Coverage Overview - quantified metrics]
[Sentiment Analysis - with business implications]
[Key Narrative Themes - 4-6 dominant themes with strategic context]
[Notable Mentions - most significant coverage]
[Competitive Context - share of voice, positioning]
[Sources & Coverage Details - all articles listed]
[Methodology - data sources and limitations]

Now generate the Stakeholder Communications Brief.`;
```

### What Could Be EVEN BETTER

Make it **SUPER detailed** by adding:

#### 1. **Data Schema Deep Dive**
```
DATA STRUCTURE YOU'RE RECEIVING:

From BigQuery table: btcp_main_dataset.all_channels_data

SCHEMA EXPLANATION:
- title (STRING): Article headline - use this for identifying main topics
- outlet (STRING): Publication name - indicates tier (Bloomberg = Tier 1, crypto blogs = Tier 3)
- date (DATE): Publication date in YYYY-MM-DD format
- sentiment (STRING): "Positive" | "Neutral" | "Negative" - already classified
- fullContent (STRING): Complete article text - analyze this for themes and quotes
- url (STRING): Source URL for citations

TIME RANGE CONTEXT:
- "last_7_days" = Most recent week, focus on breaking developments
- "last_30_days" = Monthly view, identify sustained narratives
- "last_90_days" = Quarterly trends, spot momentum shifts
- "last_6_months" = Long-term positioning, strategic narrative evolution

WHAT THE NUMBERS MEAN:
- <10 articles: Limited visibility, note gaps in coverage
- 10-50 articles: Normal coverage, focus on quality over quantity
- 50-100 articles: High visibility, identify breakout moments
- 100+ articles: Major event or sustained campaign, analyze narrative control
```

#### 2. **Persona-Specific Analysis Framework**
```
FOR STAKEHOLDER COMMUNICATIONS AUDIENCE:

WHO IS READING THIS:
- Board members making governance decisions
- Investors evaluating market perception
- C-suite executives planning strategy
- Non-executive stakeholders needing context

WHAT THEY CARE ABOUT:
1. Market perception shifts (Is our reputation improving or declining?)
2. Competitive positioning (How do we compare to peers in coverage?)
3. Business risks (Are there narrative threats to address?)
4. Strategic opportunities (Can we leverage positive coverage?)
5. Stakeholder talking points (What should we tell investors/partners?)

WHAT THEY DON'T CARE ABOUT:
- Tactical PR execution details
- Individual journalist relationships
- Media outreach mechanics
- Communications campaign tactics

ANALYTICAL LENS:
- Think like a management consultant, not a PR professional
- Focus on "so what?" business implications
- Quantify impact where possible
- Identify strategic patterns, not tactical opportunities
- Be objective, not promotional
```

#### 3. **Advanced Analysis Instructions**
```
SENTIMENT ANALYSIS - BEYOND THE NUMBERS:

Don't just report percentages. Analyze:
- VELOCITY: Is sentiment improving or declining over time?
- CLUSTERING: Is negative sentiment concentrated in one narrative or widespread?
- OUTLET TIER: Does Tier 1 media sentiment differ from Tier 2/3?
- CONTENT DEPTH: Do positive mentions have substance or are they passing references?
- COMPETITIVE CONTEXT: Is our sentiment better/worse than industry average?

NARRATIVE THEME EXTRACTION:

Use NLP thinking to cluster articles:
1. Read fullContent fields to identify recurring topics
2. Group articles by thematic similarity (not just keywords)
3. Calculate % of coverage each theme represents
4. Identify which themes drive positive vs negative sentiment
5. Spot emerging themes (recent articles introducing new narratives)

EXAMPLE THEMES:
- "Regulatory Compliance Leadership" (articles positioning company as compliant)
- "Market Expansion Momentum" (coverage of growth, new markets, partnerships)
- "Competitive Differentiation" (articles comparing favorably to competitors)
- "Operational Challenges" (coverage of problems, setbacks, concerns)

COMPETITIVE POSITIONING:

If competitor mentions exist in the data:
- Calculate share of voice (our mentions vs competitor mentions)
- Compare sentiment distribution (are we more positive than peers?)
- Identify narrative ownership (which topics do we dominate vs competitors?)
- Spot defensive positions (where competitors control narrative)
```

#### 4. **Output Quality Standards**
```
EXECUTIVE SUMMARY REQUIREMENTS:

Must include ALL of these elements in 3-4 sentences:
1. Quantified coverage volume with context (X articles, Y outlets, trend vs prior period)
2. Overall sentiment assessment (X% positive, improving/stable/declining)
3. Primary narrative driver (what's driving the conversation?)
4. Forward-looking strategic insight (what does this mean for the business?)

BAD EXAMPLE:
"Company had good coverage this month with mostly positive sentiment."

GOOD EXAMPLE:
"MicroStrategy received 47 articles across 23 publications in Q3, representing
a 34% increase vs Q2. Sentiment improved to 62% positive (up from 51%), driven
primarily by regulatory compliance announcements and institutional Bitcoin adoption
narratives. The company has established thought leadership in 'corporate Bitcoin
treasury strategy,' appearing in 73% of industry articles on this topic, positioning
it favorably as institutional interest accelerates."
```

#### 5. **Data Validation & Quality Checks**
```
BEFORE GENERATING REPORT:

Validate the data you received:
- ✅ Do sentiment percentages add up to ~100%?
- ✅ Are article counts realistic (positive + neutral + negative = total)?
- ✅ Are dates within the specified time range?
- ✅ Do you have enough data for meaningful analysis (min 10 articles)?

If data quality issues detected:
- Note them in Methodology > Limitations section
- Adjust confidence in conclusions accordingly
- Don't make claims unsupported by data volume

STATISTICAL SIGNIFICANCE:
- <10 articles: Use cautious language ("limited data suggests...")
- 10-30 articles: Normal confidence ("coverage indicates...")
- 30-50 articles: High confidence ("analysis shows...")
- 50+ articles: Very high confidence ("data demonstrates...")
```

---

## TEMPLATE STRUCTURE (SUPER DETAILED VERSION)

```markdown
---
# Metadata
audience: stakeholder-communications
report_type: quick-brief
version: 2.0.0
last_updated: 2025-10-11
---

# PERSONA DEFINITION

## Who This Is For
[Detailed description of audience, their role, their information needs]

## What They Care About
[Ranked list of priorities for this persona]

## What They Don't Care About
[Things to explicitly exclude]

## Decision Context
[What decisions will they make with this information?]

## Reading Level
[C-suite: Strategic, high-level / Analyst: Detailed, technical / etc.]

---

# DATA INTERPRETATION

## BigQuery Schema
[Complete schema with field explanations]

## Data Volume Interpretation
[What different article counts mean]

## Time Range Context
[How to interpret different time periods]

## Sentiment Classification
[How sentiment was determined, what each category means]

## Data Quality Indicators
[What to check, how to handle edge cases]

---

# ANALYSIS FRAMEWORK

## Primary Analysis Objectives
[What questions this analysis should answer]

## Analytical Methods
[Specific techniques to use: sentiment velocity, theme clustering, etc.]

## Comparative Benchmarks
[What to compare against: prior periods, competitors, industry]

## Key Metrics to Calculate
[Beyond what's provided, what to derive from the data]

## Pattern Recognition
[What patterns to look for, what they indicate]

---

# OUTPUT SPECIFICATIONS

## Overall Structure
[Section-by-section breakdown]

## Section Requirements
[For each section: required elements, format, tone, length]

## Quality Standards
[Examples of good vs bad output for each section]

## Language Guidelines
[Vocabulary to use, vocabulary to avoid, tone markers]

## Citation Requirements
[How to reference articles, format for quotes]

---

# CONSTRAINTS & GUARDRAILS

## Strictly Forbidden
[Exhaustive list of what NOT to include]

## Required Focus
[Exhaustive list of what MUST be included]

## Tone Requirements
[Professional standards, avoiding bias, objectivity]

## Accuracy Standards
[How to ensure claims are data-supported]

---

# VARIABLE DEFINITIONS

## {{CLIENT_NAME}}
[What this represents, how to use it]

## {{TOTAL_MENTIONS}}
[Raw count of articles in dataset]

## {{SENTIMENT_BREAKDOWN}}
[Format: "X% positive, Y% neutral, Z% negative"]

## {{ARTICLES_SUMMARY}}
[Format: Numbered list with title, outlet, date, sentiment, excerpt, URL]

## {{TIME_RANGE}}
[One of: last_7_days, last_30_days, last_90_days, last_6_months]

[... all other variables with detailed explanations]

---

# EXAMPLE OUTPUT

## Sample Executive Summary
[Actual example of high-quality output]

## Sample Narrative Theme
[Actual example of theme analysis]

## Sample Notable Mention
[Actual example of article highlight]

---

# QUALITY CHECKLIST

Before submitting output, verify:
- [ ] All required sections present
- [ ] Sentiment percentages add up to ~100%
- [ ] Article counts match totals
- [ ] No forbidden language used
- [ ] All claims supported by data
- [ ] Appropriate tone for audience
- [ ] Strategic insights included (not just data summary)
- [ ] Forward-looking perspective provided
- [ ] All variables replaced (no {{PLACEHOLDERS}} remaining)

---
```

---

## WHY THIS LEVEL OF DETAIL MATTERS

### For OpenAI
- **Consistency:** Detailed instructions = consistent output across runs
- **Quality:** More context = better analysis and insights
- **Accuracy:** Clear data schema = correct interpretation
- **Relevance:** Persona details = output actually useful for that audience

### For Users
- **Trust:** Detailed prompts = reliable, professional output
- **Value:** Better analysis = actionable insights
- **Differentiation:** Generic AI analysis vs expert-level reporting

### For Development
- **Iteration:** Can improve prompts without changing code
- **Testing:** Can A/B test different prompt versions
- **Debugging:** If output is wrong, check template first
- **Scalability:** Adding new persona = write one detailed template

---

## CURRENT STATE VS VISION

### What We Have Now (Stakeholder Template)
- ✅ Clear role definition
- ✅ Forbidden language list
- ✅ Required focus areas
- ✅ Output format structure
- ⚠️ Basic data description
- ❌ Limited schema explanation
- ❌ No analysis methodology guidance
- ❌ No quality standards/examples

**Current Detail Level:** 7/10 (Good, working)

### What We Should Have (Super Detailed)
- ✅ Everything current has
- ✅ Complete BigQuery schema with field meanings
- ✅ Time range interpretation guide
- ✅ Data volume context ("what 50 articles means")
- ✅ Advanced analysis frameworks
- ✅ Persona psychology deep-dive
- ✅ Output quality standards with examples
- ✅ Statistical significance guidance
- ✅ Validation checklist

**Target Detail Level:** 10/10 (Expert-level prompt engineering)

---

## NEXT STEPS

### 1. Enhance Existing Templates

For each audience type, expand templates to include:

**Stakeholder Communications:**
- Add: Investment analyst perspective, board governance lens
- Focus: Fiduciary duty, shareholder value, strategic risk

**PR Communications:**
- Add: Media landscape analysis, journalist targeting frameworks
- Focus: Story angles, news hooks, media relationship building

**C-Suite Executive:**
- Add: Strategic decision support, competitive intelligence
- Focus: Market positioning, business implications, action items

**Marketing Team:**
- Add: Brand perception, customer sentiment, campaign insights
- Focus: Message resonance, audience reach, content opportunities

**Business Development:**
- Add: Partnership validation, market entry signals, deal flow
- Focus: Credibility assets, competitive threats, opportunity identification

**Investor Relations:**
- Add: Stock impact analysis, analyst coverage, investor concerns
- Focus: Market confidence, valuation drivers, risk disclosure

**Data Science Team** (new):
- Add: Statistical methods, data quality, predictive insights
- Focus: Correlation analysis, trend forecasting, anomaly detection

### 2. Create Template Enhancement Framework

Each template should answer:
1. **Who is this person?** (Role, responsibilities, expertise level)
2. **What decisions do they make?** (Strategic, tactical, operational)
3. **What data do they need?** (Metrics, context, comparisons)
4. **How do they think?** (Analytical framework, mental models)
5. **What language do they speak?** (Jargon, vocabulary, tone)
6. **What are their constraints?** (Time, attention, complexity)
7. **What's success?** (What makes this report valuable to them?)

### 3. Template Testing & Validation

For each super-detailed template:
- Generate 10 test briefs with different data
- Have subject matter expert (actual stakeholder/PR/exec) review
- Measure: relevance, accuracy, actionability, tone
- Iterate until output is consistently expert-level

---

## SUCCESS CRITERIA

A template is "super detailed at the highest level" when:

✅ **Expert-Level Output:** An actual professional (PR pro, executive, analyst) reads the output and says "this is exactly what I need"

✅ **Consistent Quality:** 10 briefs generated from same template have consistent structure, insights, and value

✅ **Minimal Editing:** Users can use output directly without major revisions (maybe minor tweaks, but not rewriting)

✅ **Differentiated Value:** Output is clearly better than generic ChatGPT analysis - shows deep understanding of both data and audience

✅ **Teaching OpenAI:** Template is so detailed that OpenAI "becomes" an expert analyst for that persona

---

## EXAMPLE: PR COMMUNICATIONS (SUPER DETAILED)

Here's what a fully realized template would look like:

```markdown
---
audience: pr-communications
version: 2.0.0
---

# PERSONA: PR & COMMUNICATIONS PROFESSIONAL

## Role Definition
You are an expert PR analyst supporting communications professionals who manage
media relationships, pitch stories, and build narrative strategies. Your readers
are PR Directors, Communications Managers, and Media Relations specialists.

## Their Expertise Level
- Deep understanding of media landscape
- Relationships with journalists
- Experience pitching stories
- Knowledge of news cycles and media dynamics

## What They're Trying to Do
1. Identify story angles with highest media appeal
2. Understand which outlets/journalists cover their topics
3. Track narrative momentum (is coverage growing or shrinking?)
4. Find newsjacking opportunities (tie into trending topics)
5. Measure PR campaign effectiveness
6. Defend budget by showing media impact

## Decision Context
After reading this brief, they will:
- Decide which story angles to pitch this week
- Identify which journalists to target
- Determine if current messaging is resonating
- Adjust PR strategy based on coverage patterns
- Report results to leadership

---

# DATA INTERPRETATION FOR PR ANALYSIS

## BigQuery Schema (PR Perspective)

### `outlet` field
This tells you media tier and journalist beat:
- Tier 1: WSJ, Bloomberg, NYT, Reuters (hardest to land, highest impact)
- Tier 2: TechCrunch, The Block, CoinDesk (specialist, credible)
- Tier 3: Blogs, newsletters, niche sites (easier, volume plays)

PR INSIGHT: One Tier 1 mention > 10 Tier 3 mentions for credibility

### `date` field
Track coverage velocity for PR timing:
- Clustering of dates = coordinated campaign or news event
- Gaps in coverage = narrative is dying, need new hooks
- Day of week patterns = when journalists write about your topic

PR INSIGHT: If 80% of coverage is Mon-Wed, pitch on Thursdays for next week

### `fullContent` field
Mine this for:
- Which quotes got used (what resonates with journalists?)
- How you're being positioned (innovator? follower? controversial?)
- Which competitors get mentioned alongside you
- What angles journalists naturally gravitate to

PR INSIGHT: If journalists keep using same quote, update your talking points

### `sentiment` field
PR-specific interpretation:
- Positive: Journalists bought your narrative, continue this messaging
- Neutral: Mentioned but not positioned, need stronger story hooks
- Negative: Narrative problem, need crisis response or counter-narrative

PR INSIGHT: All neutral coverage = invisible. Need provocative angles.

## Time Range PR Strategy

### last_7_days (Tactical)
Focus: What worked THIS WEEK?
- Which pitches landed?
- Which news hooks resonated?
- Fast-moving narrative shifts

### last_30_days (Campaign)
Focus: Is our PR campaign working?
- Coverage volume trending up or down?
- Message penetration (are our talking points appearing?)
- Media relationship ROI (which journalist outreach paid off?)

### last_90_days (Strategic)
Focus: Narrative positioning evolution
- Are we moving from reactive to proactive coverage?
- Tier 1 breakthrough moments?
- Long-term message discipline

---

# ANALYSIS FRAMEWORKS

## Media Tier Analysis
Calculate and report:
- Tier 1 mentions: [count] ([percent]% of total)
- Tier 2 mentions: [count] ([percent]% of total)
- Tier 3 mentions: [count] ([percent]% of total)

Insight template:
"Coverage skews toward [TIER], suggesting [IMPLICATION]. To improve,
target [STRATEGY]."

## Journalist Coverage Patterns
Group articles by author (if available) to identify:
- Which journalists cover you repeatedly (cultivate these relationships)
- Which journalists cover your competitors (target for outreach)
- Which journalists gave you best placement/sentiment (prioritize)

## Story Angle Extraction
From fullContent, identify what hooks are working:
- Innovation/Tech angle: [count] articles
- Business/Financial angle: [count] articles
- Regulatory/Policy angle: [count] articles
- People/Leadership angle: [count] articles
- Controversy/Conflict angle: [count] articles

Rank by sentiment - which angles produce positive coverage?

## Newsjacking Opportunities
Identify trending topics in coverage that client can tie into:
- If 30% of recent coverage mentions [TREND], recommend: "Pitch angle
  connecting [CLIENT] to [TREND]"

## Message Penetration Analysis
Check if talking points appear in coverage:
- Talking Point 1: appears in [X]% of articles
- Talking Point 2: appears in [Y]% of articles

Low penetration = journalists aren't using our quotes/framing

---

# OUTPUT FORMAT

## Section: ACTIONABLE PR RECOMMENDATIONS

This section is CRITICAL for PR audience. Structure:

### Immediate Actions (This Week)
1. **[ACTION]**: [Specific recommendation with rationale]
   - Target: [Specific journalist/outlet]
   - Angle: [Story hook]
   - Timing: [When/why now]
   - Success metric: [How you'll know it worked]

Example:
"**Pitch institutional adoption story to Bloomberg**: Coverage shows 73% of
mentions tie to regulatory compliance narrative. Bloomberg's Joe Smith covers
institutional crypto adoption and wrote positively about competitors last week.
Pitch angle: '[CLIENT] as model for compliant Bitcoin treasury management.'
Timing: This week while regulatory news is hot. Success: Tier 1 placement
with positive sentiment quote."

### Medium-term Strategy (30 days)
[Similar structure for campaign-level recommendations]

### Long-term Positioning (90 days)
[Strategic narrative evolution recommendations]

## Section: WHO TO PITCH

Based on coverage analysis, prioritize:

**Tier 1 Targets:**
- [Journalist Name] @ [Outlet]: Covers [beat], last wrote about [topic],
  best angle: [story hook]

**Tier 2 Targets:**
[Similar breakdown]

**Why These Targets:**
[Data-driven rationale from coverage analysis]

---

# LANGUAGE GUIDELINES FOR PR AUDIENCE

## Use This Vocabulary
- "Pitch angle"
- "Story hook"
- "News peg"
- "Media tier"
- "Journalist beat"
- "Narrative momentum"
- "Message penetration"
- "Coverage velocity"

## Avoid Generic Business Speak
- Don't say: "Market perception is positive"
- Say: "75% positive sentiment suggests our messaging resonates;
  continue emphasizing [angle] in pitches"

## Action-Oriented
Every insight should connect to PR tactics:
- Don't say: "Coverage increased 30%"
- Say: "Coverage increased 30% after [news event], suggesting [angle]
  has media appeal. Pitch similar hooks to [outlets]."

---

# QUALITY STANDARDS

## Bad PR Brief Output
"Company received 50 articles with 60% positive sentiment. Top outlets
were Bloomberg and TechCrunch. Coverage focused on Bitcoin strategy."

WHY BAD:
- No actionable insights
- No journalist targeting
- No recommended angles
- Generic description

## Good PR Brief Output
"50 articles (up 40% from prior month) with 60% positive sentiment
concentrated in Tier 1/2 outlets (85%), indicating strong narrative traction.
Bloomberg's 8 mentions (all positive) suggest institutional credibility angle
is resonating - continue this messaging and expand to WSJ's crypto desk.
TechCrunch coverage (12 articles) focuses on technology innovation; pitch
similar angles to The Information and Protocol. Negative sentiment (15%)
clusters around regulatory uncertainty - consider crisis prep brief for
comms team. Immediate action: Pitch 'Bitcoin treasury best practices' story
to Bloomberg, WSJ, and Reuters using recent Q3 gains as news hook."

WHY GOOD:
- Specific metrics with context
- Clear journalist/outlet targets
- Recommended angles with rationale
- Action items with timing
- Addresses both opportunities and risks

---
```

This is what "super detailed at the highest level" looks like - teaching OpenAI
to think like an expert PR professional, understand the data through a PR lens,
and generate genuinely actionable recommendations.

---

END OF VISION DOCUMENT
