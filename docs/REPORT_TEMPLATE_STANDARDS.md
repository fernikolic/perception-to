# Report Template Quality Standards

**Version:** 1.0
**Last Updated:** November 5, 2025
**Reference Template:** PR Pitch Intelligence Brief

This document defines the quality standards, structural patterns, and design principles for all Perception report templates. Use this as the definitive guide when creating new report types.

---

## Table of Contents

1. [Core Quality Principles](#core-quality-principles)
2. [Template Structure Standards](#template-structure-standards)
3. [Section Organization](#section-organization)
4. [Content Quality Standards](#content-quality-standards)
5. [Visual Design Standards](#visual-design-standards)
6. [Technical Implementation](#technical-implementation)
7. [Email Notifications](#email-notifications)
8. [Creating a New Template](#creating-a-new-template)

---

## Core Quality Principles

### 1. **Premium Value Proposition**
Every report must justify its value to the user. For $99/month tier reports:
- Provide insights a human analyst would take hours to generate
- Include actionable recommendations with specific next steps
- Reference specific data points, article counts, and citations
- NO generic advice - every insight must be tailored to the actual data

### 2. **Anti-Repetition Rule**
**CRITICAL:** Repeating insights destroys credibility and wastes time.

**Before writing each section, ask:**
- Have I already stated this insight in a previous section?
- Am I about to repeat the same recommendation in different words?
- Can I reference an earlier section instead of re-explaining?

**Quality over quantity:** A concise report with zero repetition is infinitely better than a long report that rehashes the same points.

### 3. **Data-Driven Analysis**
Every claim must be backed by evidence:
- ✅ "Only 5 of 32 articles mention institutional adoption (Articles #3, #4, #5, #13, #14)"
- ❌ "Institutional adoption is underreported"

### 4. **Actionable Intelligence**
Every recommendation must include:
- **What** to do (specific action)
- **Where** to do it (specific outlet/target)
- **When** to do it (deadline or timing window)
- **Why** it will work (evidence-based rationale)

---

## Template Structure Standards

### Standard Report Architecture

```
1. HEADER & METADATA
   - Report title with context
   - Date range analyzed
   - Report type identifier
   - Item count

2. IMMEDIATE ACTION ITEMS (Optional but recommended)
   - 2-3 highest-priority actions
   - Bullet format for scannability
   - Each item: action + deadline + rationale

3. EXECUTIVE SUMMARY
   - 3-4 sentences maximum
   - Answers: What's happening? What's the opportunity? Why act now?
   - NO images in this section

4. PRIMARY ANALYSIS SECTIONS
   - Core insights and findings
   - Data tables, charts, competitive intelligence
   - Organized by priority/relevance

5. ACTIONABLE RECOMMENDATIONS
   - Specific opportunities with full context
   - Evidence-based with article citations
   - Risk assessment where applicable

6. SUPPORTING SECTIONS
   - Detailed breakdowns
   - Reference materials
   - Supplementary data

7. FOOTER
   - Full source list with clickable links
   - Report metadata
   - Generation details
```

### Section Ordering Rules

**CRITICAL:** Section order matters for user experience.

1. **Most Actionable First:** Users need immediate takeaways
2. **Context Before Details:** Executive summary before deep dives
3. **Competitive Intelligence Early:** Position understanding before recommendations
4. **References Last:** Full article list at the end, not scattered throughout

---

## Section Organization

### Executive Summary Standards

**Purpose:** Give the reader the "so what" in 150 words or less.

**Structure:**
1. Current state (what's happening in the data)
2. Biggest opportunity (what's missing or underreported)
3. Timing factor (why act now vs. waiting)
4. Specific recommended action (outlet + angle + deadline)

**Example (PR Pitch):**
```
Relai coverage increased significantly, with 32 articles featuring its regulatory
achievements. The narrative is dominated by the MiCA license acquisition, yet only
5 articles discuss its implications for institutional adoption. Pitch Bloomberg's
Finance Desk by November 15 with a focus on Relai's strategic expansion in Europe,
leveraging its regulatory compliance as a unique selling point. This angle remains
underexplored, offering a timely opportunity before competitors capitalize on this
regulatory milestone.
```

### Competitive Intelligence Standards

**When to Include:** If competitors are mentioned in source data OR if competitive positioning is relevant.

**Required Elements:**
1. **Share of Voice Analysis**
   - Data table with entity, mentions, %, primary narrative
   - Your position vs. competitors
   - Clear visual hierarchy (your company highlighted)

2. **Coverage Momentum & Trends**
   - Article velocity (last 7 days vs. previous 7 days)
   - Trajectory assessment (heating up/cooling down/stable)
   - Competitive momentum comparison

3. **Narrative Ownership Analysis**
   - WHO owns WHAT narratives (with article counts)
   - Your position on each narrative (Dominating/Competitive/Weak/Absent)
   - Strategic implications

4. **Strategic Positioning Framework**
   - **DEFEND:** Narratives you own (>50% share)
   - **ATTACK:** Competitor vulnerabilities to exploit
   - **CLAIM:** Unclaimed territory (gaps <30% ownership)
   - **AVOID:** Competitor strongholds (>60% share, no weakness)

**Placement:** Right after Executive Summary (early positioning context).

**When to Skip:** If NO competitive data exists, skip entirely. Don't force it.

### Actionable Recommendations Standards

**Purpose:** Give users specific, executable next steps.

**Each recommendation must include:**
```markdown
### Opportunity #[N]: [Specific, Novel Angle That Passes "3-Hour Test"]

**Why This Angle is Genuinely Novel:**
[2-3 sentences explaining the non-obvious connection or insight]

**The Gap:**
• Only X of Y articles mention [specific angle] (Articles #[list])
• Zero coverage in [specific outlet category]
• Most articles focus on [what they're missing]

**Target Outlets:**
• Primary: [Outlet Name] - [Specific Desk/Section]
  - Why: [Evidence of fit from their coverage history]
• Secondary: [Outlet Name] - [Desk]

**Specific Reporters to Target:**
• [Reporter Name] at [Outlet] - recently covered [related topic]
• [Reporter Name] at [Outlet] - beat includes [relevant area]

**Timing Window:**
• Pitch by: [Specific Date]
• Why urgent: [Catalyst or competitive threat]
• Window closes when: [Specific event or competitor action]

**Pitch Angle/Subject Line:**
"[Counterintuitive hook revealing second-order implications]"

**Supporting Elements:**
• Data point: [Specific metric with source]
• Quote opportunity: [Name, Title]
• Proof point: [Evidence from articles]

**Expected Coverage:**
[Realistic prediction of outcome type]
```

---

## Content Quality Standards

### Citation Standards

**Always cite sources explicitly:**
```markdown
✅ GOOD: Only 5 of 32 articles mention institutional adoption (Articles #3, #4, #5, #13, #14)
❌ BAD: Few articles mention institutional adoption

✅ GOOD: "As reported in Bitcoin Magazine [Article 3], Relai secured..."
❌ BAD: Recent reports suggest Relai secured...
```

### Article Reference Format

**NEW FORMAT (Preferred):**
```markdown
**[Article X]** [Title](url) **Outlet:** [Name] • **Date:** [Date] • **Sentiment:** [Positive/Neutral/Negative] **Author:** [Name] **Image:** [URL] **→ [`[domain]`](url)**
```

This creates a rich, clickable article card with:
- Article number badge
- Clickable title
- Inline metadata (outlet, date, sentiment, author)
- Featured image (if available)
- "Read Full Article" CTA button

### Table Standards

**Always use markdown tables for comparative data:**

```markdown
| Entity | Mentions | Share of Voice | Primary Narrative | Strategic Position |
|--------|----------|----------------|-------------------|-------------------|
| **Your Company** 👈 YOU | 32 | 60% | Regulatory compliance | Market leader |
| Competitor A | 24 | 30% | Price volatility | Lagging |
| Competitor B | 10 | 10% | Technical features | Niche player |
```

**Design:**
- Black header row (#000000 background, white text)
- Alternating row backgrounds (transparent / rgba(0,0,0,0.02))
- Bold first column
- Highlight user's row with 👈 YOU marker

### Image Standards

**CRITICAL:** Images must use proper markdown syntax to render.

**Correct Format:**
```markdown
![Descriptive caption](https://secure-url.com/image.jpg)
*Article title, Outlet Name, Date*
```

**Requirements:**
1. HTTPS URLs only (convert http:// to https://)
2. Remove URL suffixes like @png, @jpg
3. Include descriptive alt text
4. Add caption with article context
5. Never paste raw URLs - they won't render

**Image Injection Points (PR Pitch template):**
1. After Executive Summary
2. After Narrative Landscape Analysis
3. After Coverage Saturation Breakdown
4. After Media Landscape Breakdown
5. After Top Pitch Opportunities

**Rule:** 3-5 images throughout report, strategically placed after major section headers.

---

## Visual Design Standards

### Typography Hierarchy

```css
H1 (Report Title): 2.25rem, font-weight: 800, gradient text
H2 (Section Headers): 1.5rem, font-weight: 700, border-bottom
H3 (Subsections): 1.25rem, font-weight: 600
Body Text: 1rem, line-height: 1.75
```

### Color Palette

**Primary:**
- Black: #000000 (headers, CTAs, strong emphasis)
- Dark Gray: #0f172a, #1e293b (text)
- Gray: #334155, #64748b (secondary text)

**Accents:**
- Blue: #3b82f6 (links, citations)
- Green: #22c55e (positive sentiment)
- Red: #ef4444 (negative sentiment)
- Yellow/Orange: #f59e0b (warnings, urgent items)

**Backgrounds:**
- White: #ffffff
- Light Gray: #f8f9fa, #f5f5f5
- Subtle: rgba(0,0,0,0.02)

### Component Styling

**Article Reference Cards:**
```css
- Clean white/transparent background
- No heavy borders (use subtle shadow or border)
- Article number badge: Black background, white text
- Metadata: Gray text, dot separators
- CTA button: Black gradient, rounded corners
```

**Data Tables:**
```css
- Black header row
- Bordered cells with rgba(0,0,0,0.1)
- Alternating row backgrounds
- Bold first column
- Hover effects for interactivity
```

**Blockquotes:**
```css
- 4px solid left border (#000000)
- Italic serif font (Charter, Georgia)
- Larger font size (1.375rem)
- Light background: rgba(0,0,0,0.02)
- Generous padding
```

### Emoji Usage

**Rule:** NO emojis in section headers or professional content.

**Exceptions:**
- ✅ Checkmarks for positive indicators
- ❌ X marks for negative indicators
- ⚠️ Warning symbols for caution
- 📊 In metadata/tags only (not visible headers)
- 🎯 For highlighting key points in lists

---

## Technical Implementation

### Backend Function Structure

```typescript
export const generateYourReport = onRequest({
  region: 'us-central1',
  maxInstances: 10,
  timeoutSeconds: 300, // 5 minutes
  secrets: ['ANTHROPIC_API_KEY', 'PERPLEXITY_API_KEY'], // Add as needed
}, async (req, res) => {
  try {
    // 1. Immediate Response (don't await anything before this!)
    res.status(200).json({
      status: 'processing',
      message: 'Report generation started'
    });

    // 2. Background Processing
    setImmediate(async () => {
      try {
        // Verify auth
        const userId = await verifyAuth(req.headers.authorization);

        // Fetch user info for email
        const userRecord = await admin.auth().getUser(userId);
        const userEmail = userRecord.email || '';
        const userName = userRecord.displayName || 'there';

        // Generate report
        const finalReport = await generateReportContent(...);

        // Save to Firestore
        await admin.firestore().collection('spaces').doc(spaceId).update({
          summary: finalReport,
          savedReports: admin.firestore.FieldValue.arrayUnion(newReport),
          lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        });

        // Send email notification
        if (userEmail) {
          await sendReportCompletionEmail(
            userEmail,
            userName,
            reportTitle,
            spaceId,
            itemCount
          );
        }
      } catch (error) {
        console.error('Background processing error:', error);
        // Update Firestore with error
      }
    });

  } catch (error) {
    // Handle pre-response errors
  }
});
```

### Prompt Engineering Patterns

**Core Structure:**
```typescript
const prompt = `You are a [ROLE] specializing in [DOMAIN]. You create [VALUE PROPOSITION] reports.

${reportConfigContext} // User-provided context

═══════════════════════════════════════════════════════════════════
QUALITY STANDARDS - YOUR OUTPUT WILL BE REJECTED IF MISSING:
═══════════════════════════════════════════════════════════════════

🚫 CRITICAL ANTI-REPETITION RULE:
[Detailed instructions on avoiding repetition]

✅ MANDATORY REQUIREMENTS:
1. [Requirement with specific format]
2. [Requirement with examples]
3. [Requirement with metrics]

VISUAL ENHANCEMENTS - IMAGES & CHARTS:
[Image syntax requirements]

═══════════════════════════════════════════════════════════════════
REQUIRED OUTPUT FORMAT:
═══════════════════════════════════════════════════════════════════

## SECTION 1: [NAME]
[Detailed format with examples]

## SECTION 2: [NAME]
[Detailed format with examples]

---

FULL SOURCE MATERIAL TO ANALYZE:
${contentToAnalyze}

---

Begin your report now:`;
```

**Prompt Best Practices:**
1. **Be Extremely Specific:** Show exact format with examples
2. **Enforce Quality Rules:** Anti-repetition, citation requirements, word limits
3. **Provide Context:** Include reportConfig data, user priorities
4. **Ban Bad Patterns:** Explicitly list what NOT to do
5. **Demand Evidence:** Require article numbers, data points, quotes

### Report Config Integration

**Always check for and integrate reportConfig:**

```typescript
let reportConfigContext = '';

if (reportConfig) {
  reportConfigContext = '\n\n═══════════════════════════════════════\n';
  reportConfigContext += 'REPORT CONFIGURATION CONTEXT\n';
  reportConfigContext += '═══════════════════════════════════════\n\n';

  if (reportConfig.industryContext) {
    reportConfigContext += `**Industry Context:** ${reportConfig.industryContext}\n\n`;

    // Enhance with Perplexity search
    const perplexityResult = await searchIndustryContext(
      reportConfig.industryContext,
      perplexityApiKey
    );
    reportConfigContext += formatPerplexityContext(perplexityResult);
  }

  if (reportConfig.stakeholder?.boardPriorities?.length) {
    reportConfigContext += `**Board Priorities:** ${reportConfig.stakeholder.boardPriorities.join(', ')}\n\n`;
  }

  // Add all relevant config fields...

  reportConfigContext += '**IMPORTANT:** Weave this context naturally throughout your analysis.\n\n';
  reportConfigContext += '═══════════════════════════════════════\n\n';
}
```

### Image Injection Logic

```typescript
// After AI generates report, inject images at strategic points
const articlesWithImages = briefItems
  .filter(item => item.image_url && item.image_url.length > 0)
  .slice(0, 5); // Top 5 images

const injectedImageUrls = new Set<string>();

// 1. Inject after Executive Summary
if (articlesWithImages.length >= 1 && !injectedImageUrls.has(articlesWithImages[0].image_url)) {
  const execSummaryPattern = /(##\s*EXECUTIVE\s*SUMMARY[^\n]*\n)/i;
  if (execSummaryPattern.test(finalReport)) {
    const imageMarkdown = `\n![${title}](${imageUrl}) *${caption}*\n`;
    finalReport = finalReport.replace(execSummaryPattern, `$1${imageMarkdown}\n`);
    injectedImageUrls.add(articlesWithImages[0].image_url);
  }
}

// Repeat for other strategic injection points...
```

---

## Email Notifications

### Email Notification Pattern

**Every report template should send a completion email.**

```typescript
async function sendReportCompletionEmail(
  userEmail: string,
  userName: string,
  reportTitle: string,
  spaceId: string,
  itemCount: number
): Promise<void> {
  const brevoApiKey = process.env.BREVO_API_KEY?.trim();

  if (!brevoApiKey) {
    console.warn('⚠️ BREVO_API_KEY not configured - skipping email');
    return;
  }

  try {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);

    const reportUrl = `https://app.perception.to/spaces/${spaceId}`;

    const htmlContent = `[Professional HTML email template]`;

    await apiInstance.sendTransacEmail({
      sender: {
        email: 'notifications@perception.to', // Whitelisted sender
        name: 'Perception Reports',
      },
      to: [{ email: userEmail, name: userName }],
      subject: `✅ Your report "${reportTitle}" is ready`,
      htmlContent,
      tags: ['report-completion', `template-${templateType}`],
    });

    console.log(`📧 [EMAIL] Sent to ${userEmail}`);
  } catch (error) {
    console.error('📧 [EMAIL] Failed:', error);
    // Don't throw - email failure shouldn't fail report generation
  }
}
```

### Email Template Standards

**Required Elements:**
1. **Header:** Branded gradient, report type icon, clear title
2. **Content:** Personalized greeting, report title, item count
3. **CTA Button:** "View Your Report →" with direct link
4. **Details Box:** Report metadata in highlighted section
5. **Footer:** Copyright, unsubscribe context

**Design:**
- Match Perception brand (black/gray gradient headers)
- Mobile-responsive (max-width: 600px)
- Inline CSS (email clients don't support external stylesheets)
- Professional tone, concise copy

---

## Creating a New Template

### Step-by-Step Process

**1. Define Template Purpose & Value**
```markdown
- Who is this for? (persona)
- What problem does it solve?
- What makes it worth $X/month?
- What unique insights can only AI provide?
```

**2. Design Section Architecture**
```markdown
Using standard structure:
1. Header & Metadata
2. Immediate Action Items (if applicable)
3. Executive Summary
4. [Primary Analysis Sections - custom to your template]
5. [Actionable Recommendations - custom to your template]
6. [Supporting Sections - custom to your template]
7. Footer with sources
```

**3. Build the Prompt**
```typescript
- Follow prompt engineering patterns above
- Include anti-repetition rules
- Define exact output format with examples
- Specify required citations and evidence
- Ban bad patterns explicitly
```

**4. Implement Backend Function**
```typescript
- Copy generateSpaceReport structure
- Update prompt to your template
- Maintain async response pattern
- Include email notification
- Add proper error handling
```

**5. Test with Real Data**
```markdown
- Test with 10, 50, 100+ items
- Verify no repetition
- Check all citations work
- Confirm images render
- Test email delivery
```

**6. Update Frontend**
```typescript
// In space-detail.tsx or report generator
- Add template to audience type selector
- Update progress message with appropriate time estimate
- Ensure proper template selection logic
```

---

## Quality Checklist

Use this checklist before launching any new template:

### Content Quality
- [ ] Zero repetition across all sections
- [ ] Every claim backed by specific data/citations
- [ ] Article references use [Article X] format
- [ ] All recommendations include: what, where, when, why
- [ ] Executive summary under 150 words
- [ ] No generic advice - all insights tailored to data

### Visual Quality
- [ ] 3-5 images properly formatted and rendering
- [ ] All tables use markdown table format
- [ ] Section headers follow typography hierarchy
- [ ] No emojis in section headers
- [ ] Proper spacing and readability

### Technical Quality
- [ ] Immediate 200 response before heavy processing
- [ ] Background processing in setImmediate
- [ ] Proper error handling with Firestore updates
- [ ] Email notification sent on completion
- [ ] User email/name fetched correctly
- [ ] reportConfig integrated into prompt

### User Experience
- [ ] Progress message shows accurate time estimate
- [ ] No ugly dividers or unnecessary formatting
- [ ] Email arrives within 1 minute of completion
- [ ] Report URL in email works correctly
- [ ] Report renders properly in editor

---

## Examples & Templates

### Reference Implementation

**Best Practice Example:** `functions/src/space-report-generator.ts`
- Full implementation of all standards
- PR Pitch Intelligence Brief template
- ~2500 lines including prompts and logic

### Reusable Components

**Competitive Analysis:** `functions/src/utils/competitor-analysis.ts`
- BigQuery search for competitors
- Share of voice calculation
- Formatted markdown output

**Industry Search:** `functions/src/utils/perplexity-search.ts`
- Perplexity API integration
- Real-time context enhancement

**Reporter Search:** `functions/src/utils/reporter-search.ts`
- Find journalists by outlet and topic
- BigQuery integration

---

## Versioning & Updates

**Version History:**
- **v1.0** (Nov 5, 2025): Initial standards based on PR Pitch template
  - Anti-repetition rules
  - Competitive intelligence framework
  - Email notifications
  - Image injection patterns

**Update Process:**
When updating these standards:
1. Update version number and date at top
2. Add entry to version history
3. Notify team of changes
4. Update existing templates if breaking changes

---

## Questions & Support

**For questions about these standards:**
- Reference the PR Pitch template implementation first
- Check existing competitor analysis patterns
- Review email notification examples in other functions

**When in doubt:**
- Prioritize user value over AI convenience
- Choose clarity over complexity
- Prefer data-driven over speculative
- Always cite sources explicitly

---

**End of Document**
