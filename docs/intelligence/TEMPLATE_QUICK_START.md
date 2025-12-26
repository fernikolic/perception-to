# TEMPLATE SYSTEM QUICK START GUIDE
**How to Work with Intelligence Templates**

**Audience:** Developers adding or modifying templates
**Time to Read:** 5 minutes
**Last Updated:** October 11, 2025

---

## CURRENT STATE (Before Standardization)

### Where Templates Live NOW

```
Quick Brief Templates:
├── Hardcoded in: /functions/src/quick-brief-generator.ts
│   ├── buildStakeholderBriefPrompt() - Lines 2087-2335
│   └── buildPRBriefPrompt() - Lines 1258-1814
└── Documentation: /docs/quick-brief/STAKEHOLDER_TEMPLATE.md

Custom Report Templates:
├── Hardcoded in: /src/lib/services/report-generator.ts
│   ├── getBusinessIntelligenceTemplate() - Lines 101-169
│   ├── getPRCommunicationsTemplate() - Lines 342-387
│   ├── getExecutiveTemplate() - Lines 436-490
│   └── (4 more templates)
└── Documentation: /docs/report-templates/*.md (7 files)
```

### How to Update a Template NOW (Current Process)

**Example: Update Stakeholder Communications template**

1. **Update documentation** (if it exists):
   ```bash
   # Edit the markdown doc
   vim /docs/quick-brief/STAKEHOLDER_TEMPLATE.md
   ```

2. **Update Quick Brief code**:
   ```bash
   # Edit the TypeScript function
   vim /functions/src/quick-brief-generator.ts
   # Navigate to line 2087
   # Update buildStakeholderBriefPrompt() function
   ```

3. **Update Custom Report code** (if applicable):
   ```bash
   # Edit frontend service
   vim /src/lib/services/report-generator.ts
   # Find and update relevant template function
   ```

4. **Update backend** (if applicable):
   ```bash
   # Edit backend function
   vim /functions/src/pr-report-generator.ts
   # Update hardcoded prompt around line 122
   ```

5. **Build and deploy**:
   ```bash
   cd /functions
   npm run build
   gcloud functions deploy generateQuickBriefHTTP ...
   ```

**Problems:**
- ❌ 3-4 files to update
- ❌ Templates drift out of sync
- ❌ No validation
- ❌ 2-4 hours per template change

---

## FUTURE STATE (After Standardization)

### Where Templates Will Live

```
All Templates (Single Source of Truth):
└── /functions/src/templates/
    ├── quick-brief/
    │   ├── stakeholder-communications.md
    │   ├── pr-communications.md
    │   ├── c-suite-executive.md
    │   └── (5 more .md files)
    └── custom-report/
        ├── stakeholder-communications.md
        ├── pr-communications.md
        └── (5 more .md files)

Documentation:
└── /docs/intelligence/
    ├── README.md
    ├── TEMPLATE_GUIDE.md
    └── ADDING_NEW_AUDIENCE.md
```

### How to Update a Template (Future Process)

**Example: Update Stakeholder Communications template**

1. **Edit single template file**:
   ```bash
   vim /functions/src/templates/quick-brief/stakeholder-communications.md
   ```

2. **Validate**:
   ```bash
   npm run validate-templates
   ```

3. **Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

**Benefits:**
- ✅ 1 file to update
- ✅ Auto-validated
- ✅ Version controlled
- ✅ 30 minutes per template change

---

## ADDING A NEW AUDIENCE TYPE

### Current Process (Before Standardization)

**Example: Add "Data Science Team" audience**

1. Create documentation:
   ```bash
   vim /docs/report-templates/data-science-team.md
   # Write template documentation
   ```

2. Add to Quick Brief UI:
   ```typescript
   // src/components/quick-brief-modal.tsx
   const briefTypes = [
     // ... existing types
     {
       id: 'data-science' as BriefType,
       label: 'Data Science Team',
       description: 'Analytics and insights for data teams',
       enabled: true
     }
   ];
   ```

3. Add to Quick Brief backend:
   ```typescript
   // functions/src/quick-brief-generator.ts
   function buildDataScienceBriefPrompt(data: BriefData): string {
     // Write 200-300 lines of template code
     return `Generate a DATA SCIENCE BRIEF...`;
   }

   // Update prompt selection
   const prompt = briefType === 'data-science'
     ? buildDataScienceBriefPrompt(enrichedData)
     : briefType === 'stakeholder-communications'
     ? buildStakeholderBriefPrompt(enrichedData)
     : buildPRBriefPrompt(enrichedData);
   ```

4. Add to Custom Report frontend:
   ```typescript
   // src/lib/services/report-generator.ts
   function getDataScienceTemplate(): string {
     return `# {{CLIENT_NAME}} Data Science Brief...
     // 50-100 lines of hardcoded template
     `;
   }

   function getTemplateForAudience(audienceType: string): string {
     switch (audienceType.toLowerCase()) {
       case 'data-science':
         return getDataScienceTemplate();
       // ... other cases
     }
   }
   ```

5. Add to Custom Report backend:
   ```typescript
   // functions/src/pr-report-generator.ts
   // Update prompt to handle data-science case
   ```

6. Build, test, deploy:
   ```bash
   npm run build
   npm test
   # Deploy to staging
   # Manual testing
   # Deploy to production
   ```

**Total:** 5 files, 400+ lines of code, 4-6 hours

---

### Future Process (After Standardization)

**Example: Add "Data Science Team" audience**

1. **Create template file**:
   ```bash
   # Copy existing template as starting point
   cp /functions/src/templates/quick-brief/business-intelligence.md \
      /functions/src/templates/quick-brief/data-science-team.md

   # Edit template
   vim /functions/src/templates/quick-brief/data-science-team.md
   ```

   ```markdown
   ---
   version: 1.0.0
   audience: data-science-team
   report_type: quick-brief
   last_updated: 2025-10-11
   author: Your Name
   tags: [data-science, analytics, insights]
   ---

   # TEMPLATE: Data Science Team Brief

   ## Purpose
   Strategic analytics and data insights for data science teams making
   data-driven decisions...

   ## System Prompt
   You are a data intelligence analyst creating reports for data science
   teams. Focus on statistical significance, data patterns, and actionable
   insights from media coverage...

   ## User Prompt Template
   Generate a DATA SCIENCE BRIEF for {{CLIENT_NAME}}...

   ## Variables Required
   - {{CLIENT_NAME}}
   - {{TOTAL_MENTIONS}}
   - {{SENTIMENT_BREAKDOWN}}
   ...
   ```

2. **Validate template**:
   ```bash
   npm run validate-templates
   # ✅ Template validated successfully
   ```

3. **Add to UI** (only place with code change):
   ```typescript
   // src/components/quick-brief-modal.tsx
   const briefTypes = [
     // ... existing types
     {
       id: 'data-science-team' as BriefType,
       label: 'Data Science Team',
       description: 'Analytics and insights for data teams',
       enabled: true
     }
   ];
   ```

4. **Deploy**:
   ```bash
   npm run build
   npm run deploy
   # Template auto-loads from file
   # No backend changes needed!
   ```

**Total:** 2 files (1 template + 1 UI), <30 minutes

**Difference:** 83% less code, 88% faster!

---

## TEMPLATE FILE FORMAT

### Structure

```markdown
---
# YAML Front Matter (metadata)
version: 1.0.0
audience: audience-type-slug
report_type: quick-brief | custom-report
last_updated: YYYY-MM-DD
author: Your Name
tags: [tag1, tag2, tag3]
---

# TEMPLATE: Human-Readable Name

## Purpose
[Clear description of who this is for and what it does]

## System Prompt
[Instructions for OpenAI about role, tone, and constraints]

## User Prompt Template
[The actual prompt with {{VARIABLES}} that get replaced]

## Variables Required
- {{VARIABLE_1}} - Description
- {{VARIABLE_2}} - Description

## Expected Output Format
[Description or example of output structure]

## Validation Rules
[Any specific requirements or constraints]
```

### Example: Stakeholder Communications

```markdown
---
version: 1.0.0
audience: stakeholder-communications
report_type: quick-brief
last_updated: 2025-10-11
author: Perception Team
tags: [stakeholder, executive, board, investor]
---

# TEMPLATE: Stakeholder Communications Brief

## Purpose
Strategic intelligence brief for board members, investors, and C-suite
executives. NOT a PR or marketing document.

## System Prompt
You are a strategic media intelligence analyst creating reports for executive
stakeholders. Your output will be read by CEOs, CFOs, board members, and
investors who need objective analysis of market perception and competitive
positioning.

STRICTLY FORBIDDEN:
- Journalist outreach recommendations
- PR tactics or media relationship advice
- Newsjacking opportunities

REQUIRED FOCUS:
- Market perception and sentiment trends
- Competitive narrative positioning
- Strategic risks and opportunities
- Business implications

## User Prompt Template
Generate a STAKEHOLDER COMMUNICATIONS BRIEF for {{CLIENT_NAME}}.

**Coverage Metrics:**
- Total Articles: {{TOTAL_MENTIONS}}
- Unique Publications: {{OUTLET_COUNT}}
- Sentiment: {{POSITIVE_PCT}}% Positive | {{NEUTRAL_PCT}}% Neutral | {{NEGATIVE_PCT}}% Negative
- Analysis Period: {{ANALYSIS_PERIOD}}

**Articles:**
{{ARTICLES_SUMMARY}}

Generate a professional brief with:
1. Executive Summary
2. Media Coverage Overview
3. Sentiment Analysis
4. Key Narrative Themes
5. Notable Mentions
6. Competitive Context
7. Sources & Coverage Details

## Variables Required
- {{CLIENT_NAME}} - Company or topic name
- {{TOTAL_MENTIONS}} - Total article count
- {{OUTLET_COUNT}} - Number of unique publications
- {{POSITIVE_PCT}} - Positive sentiment percentage
- {{NEUTRAL_PCT}} - Neutral sentiment percentage
- {{NEGATIVE_PCT}} - Negative sentiment percentage
- {{ANALYSIS_PERIOD}} - Date range analyzed
- {{ARTICLES_SUMMARY}} - Formatted list of articles

## Expected Output Format
Markdown document with:
- H1 title
- H2 section headers
- Bullet lists for metrics
- Numbered lists for articles
- Professional, analytical tone

## Validation Rules
- Minimum 10 articles required
- Sentiment percentages must add up to ~100%
- No PR language ("Pitch to...", "Newsjacking", etc.)
- All {{VARIABLES}} must be replaced
```

---

## TESTING TEMPLATES

### Manual Testing (Current)

```bash
# 1. Make changes to code
vim /functions/src/quick-brief-generator.ts

# 2. Build
npm run build

# 3. Deploy to test environment
gcloud functions deploy generateQuickBriefHTTP --project=test

# 4. Go to UI and generate a test brief
# 5. Manually review output
# 6. If issues, repeat steps 1-5
```

### Automated Testing (Future)

```bash
# 1. Update template file
vim /functions/src/templates/quick-brief/stakeholder-communications.md

# 2. Run validation
npm run validate-templates
# ✅ All templates valid

# 3. Run template tests
npm test -- templates
# ✅ Template loads successfully
# ✅ Variables replace correctly
# ✅ Output format valid
# ✅ No forbidden language detected

# 4. Deploy (already tested!)
npm run deploy
```

---

## COMMON TASKS

### Task 1: Update Existing Template

```bash
# 1. Find template file
ls /functions/src/templates/quick-brief/

# 2. Edit
vim /functions/src/templates/quick-brief/pr-communications.md

# 3. Validate
npm run validate-templates

# 4. Test locally
npm test -- pr-communications

# 5. Deploy
npm run deploy
```

### Task 2: Fix Template Bug

```bash
# 1. Check logs for error
gcloud functions logs read generateQuickBriefHTTP

# 2. Identify problematic template
# Error: "Variable {{MISSING_VAR}} not found in data"

# 3. Edit template to fix
vim /functions/src/templates/quick-brief/problematic-template.md

# 4. Validate fix
npm run validate-templates

# 5. Test with sample data
npm test -- problematic-template

# 6. Deploy hotfix
npm run deploy
```

### Task 3: Clone Template for New Audience

```bash
# 1. Copy similar template
cp /functions/src/templates/quick-brief/business-intelligence.md \
   /functions/src/templates/quick-brief/legal-team.md

# 2. Update metadata
vim /functions/src/templates/quick-brief/legal-team.md
# Change: audience, tags, author

# 3. Customize content
# Update: Purpose, System Prompt, User Prompt Template

# 4. Validate
npm run validate-templates

# 5. Add to UI
# (Only UI change needed!)

# 6. Deploy
npm run deploy
```

---

## TROUBLESHOOTING

### Problem: Template Not Loading

**Error:** `Template not found: stakeholder-communications`

**Solution:**
```bash
# Check file exists
ls /functions/src/templates/quick-brief/stakeholder-communications.md

# Check file name matches audience type exactly
# audience: stakeholder-communications (in YAML)
# filename: stakeholder-communications.md
```

### Problem: Variable Not Replaced

**Error:** `Output contains unreplaced variable: {{MISSING_VAR}}`

**Solution:**
```typescript
// Check data object includes all required variables
const templateData = {
  CLIENT_NAME: keyword,
  TOTAL_MENTIONS: articles.length,
  // Add missing variable:
  MISSING_VAR: someValue,
};
```

### Problem: Validation Fails

**Error:** `Template validation failed: Missing required section 'System Prompt'`

**Solution:**
```markdown
# Add missing section to template
## System Prompt
[Your system prompt here]
```

---

## BEST PRACTICES

### DO ✅
- Use descriptive variable names: `{{CLIENT_NAME}}` not `{{CN}}`
- Document all variables in "Variables Required" section
- Include validation rules
- Test templates before deploying
- Version templates (update `version` in YAML)
- Use consistent formatting

### DON'T ❌
- Hardcode templates in TypeScript
- Duplicate templates across files
- Skip validation
- Use undefined variables
- Modify templates directly in production
- Forget to update `last_updated` date

---

## RESOURCES

### Documentation
- Full Audit: `/docs/INTELLIGENCE_SYSTEM_AUDIT.md`
- Proposal: `/docs/STANDARDIZATION_PROPOSAL.md`
- Architecture: `/docs/intelligence/ARCHITECTURE.md` (after standardization)

### Code
- Template Loader: `/functions/src/intelligence/shared/template-loader.ts`
- Validation: `/functions/src/intelligence/validators/template-validator.ts`
- Tests: `/functions/src/tests/intelligence/`

### Examples
- Stakeholder Template: `/functions/src/templates/quick-brief/stakeholder-communications.md`
- PR Template: `/functions/src/templates/quick-brief/pr-communications.md`

---

## GETTING HELP

### Questions?
1. Check this guide first
2. Read full documentation in `/docs/intelligence/`
3. Review existing templates for examples
4. Ask in #engineering Slack channel

### Found a Bug?
1. Check if it's a template issue or code issue
2. Create GitHub issue with:
   - Template name
   - Expected behavior
   - Actual behavior
   - Sample data that reproduces issue

---

**Status:** 🟡 Guide prepared for post-standardization use

**Note:** This guide describes the FUTURE state. See "Current State" section
for how to work with templates TODAY (before standardization complete).

---

END OF GUIDE
