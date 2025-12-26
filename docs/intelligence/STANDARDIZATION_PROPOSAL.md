# INTELLIGENCE SYSTEM STANDARDIZATION PROPOSAL
**Unified Template Architecture for Quick Brief & Custom Report**

**Version:** 1.0
**Date:** October 11, 2025
**Status:** 📋 PROPOSAL - Awaiting Approval

**Related:** See `INTELLIGENCE_SYSTEM_AUDIT.md` for current state analysis

---

## VISION

Create a **unified, scalable template system** where:
- ✅ Templates are stored in a single location
- ✅ Both Quick Brief and Custom Report use the same templates
- ✅ Adding a new audience type takes <30 minutes
- ✅ Templates are versioned and testable
- ✅ Documentation auto-syncs with code

---

## PROPOSED FOLDER STRUCTURE

```
perception/
├── docs/
│   ├── intelligence/                        ← UNIFIED docs folder
│   │   ├── README.md                        ← Overview of intelligence system
│   │   ├── ARCHITECTURE.md                  ← System architecture
│   │   ├── TEMPLATE_GUIDE.md                ← How to create/modify templates
│   │   ├── ADDING_NEW_AUDIENCE.md           ← Step-by-step guide
│   │   └── CHANGELOG.md                     ← Template version history
│   │
│   └── archive/                             ← Move old docs here
│       ├── quick-brief/                     ← Keep for reference
│       └── report-templates/                ← Keep for reference
│
├── functions/
│   ├── src/
│   │   ├── intelligence/                    ← NEW: Intelligence module
│   │   │   ├── index.ts                     ← Main entry points
│   │   │   ├── quick-brief.ts               ← Quick Brief logic (refactored)
│   │   │   ├── custom-report.ts             ← Custom Report logic (refactored)
│   │   │   ├── shared/
│   │   │   │   ├── data-fetcher.ts          ← BigQuery + data utils
│   │   │   │   ├── sentiment-calculator.ts  ← Sentiment logic
│   │   │   │   ├── openai-client.ts         ← OpenAI wrapper
│   │   │   │   └── template-loader.ts       ← Load & process templates
│   │   │   └── validators/
│   │   │       ├── data-validator.ts        ← Validate input data
│   │   │       └── template-validator.ts    ← Validate templates
│   │   │
│   │   ├── templates/                       ← SINGLE SOURCE OF TRUTH
│   │   │   ├── README.md                    ← Template system docs
│   │   │   ├── _schema.json                 ← Template validation schema
│   │   │   ├── quick-brief/                 ← Quick Brief templates
│   │   │   │   ├── pr-communications.md
│   │   │   │   ├── stakeholder-communications.md
│   │   │   │   ├── c-suite-executive.md
│   │   │   │   ├── marketing-team.md
│   │   │   │   ├── business-development.md
│   │   │   │   ├── investor-relations.md
│   │   │   │   └── business-intelligence.md
│   │   │   └── custom-report/               ← Custom Report templates
│   │   │       ├── pr-communications.md
│   │   │       ├── stakeholder-communications.md
│   │   │       ├── c-suite-executive.md
│   │   │       ├── marketing-team.md
│   │   │       ├── business-development.md
│   │   │       ├── investor-relations.md
│   │   │       └── business-intelligence.md
│   │   │
│   │   └── tests/
│   │       └── intelligence/
│   │           ├── template-loader.test.ts
│   │           ├── sentiment-calculator.test.ts
│   │           └── template-output.test.ts
│   │
│   └── scripts/
│       └── validate-templates.ts            ← CI/CD template validation
│
└── src/
    └── lib/
        └── services/
            └── intelligence/                ← Unified frontend service
                ├── index.ts
                ├── quick-brief-client.ts    ← Quick Brief API client
                └── custom-report-client.ts  ← Custom Report API client
```

---

## TEMPLATE FILE STRUCTURE

Each template file follows this structure:

```markdown
---
# Template Metadata (YAML front matter)
version: 1.0.0
audience: pr-communications
report_type: quick-brief
last_updated: 2025-10-11
author: Perception Team
tags: [pr, communications, media, stakeholder]
---

# TEMPLATE: PR Communications Brief

## Purpose
[Clear description of audience and use case]

## System Prompt
[Instructions for OpenAI about role and constraints]

## User Prompt Template
[Template with {{VARIABLES}} that get replaced with data]

## Variables Required
- {{CLIENT_NAME}} - Company/topic name
- {{TOTAL_MENTIONS}} - Article count
- {{SENTIMENT_SCORE}} - Sentiment breakdown
[etc.]

## Expected Output Format
[Sample output structure]

## Validation Rules
- Minimum article count: 10
- Required sections: [list]
- Forbidden language: [list]
```

---

## TEMPLATE LOADING SYSTEM

### Template Loader Interface

```typescript
// functions/src/intelligence/shared/template-loader.ts

interface TemplateMetadata {
  version: string;
  audience: AudienceType;
  reportType: 'quick-brief' | 'custom-report';
  lastUpdated: string;
  author: string;
  tags: string[];
}

interface Template {
  metadata: TemplateMetadata;
  systemPrompt: string;
  userPromptTemplate: string;
  requiredVariables: string[];
  validationRules: ValidationRule[];
}

interface TemplateData {
  [key: string]: string | number | boolean | any;
}

class TemplateLoader {
  /**
   * Load a template from file system
   */
  static async loadTemplate(
    audienceType: AudienceType,
    reportType: 'quick-brief' | 'custom-report'
  ): Promise<Template> {
    // Read template file from /templates/{reportType}/{audienceType}.md
    // Parse YAML front matter
    // Extract sections
    // Validate structure
    // Return Template object
  }

  /**
   * Process template with data
   */
  static processTemplate(
    template: Template,
    data: TemplateData
  ): { systemPrompt: string; userPrompt: string } {
    // Validate all required variables are present
    // Replace {{VARIABLES}} with actual data
    // Return processed prompts
  }

  /**
   * Validate template file
   */
  static validateTemplate(template: Template): ValidationResult {
    // Check all required sections present
    // Validate variable syntax
    // Check for forbidden patterns
    // Return validation result
  }
}
```

---

## REFACTORED QUICK BRIEF

### Current (3,113 lines)
```typescript
// functions/src/quick-brief-generator.ts
export const generateQuickBriefHTTP = onRequest(async (req, res) => {
  // 3,113 lines of mixed concerns:
  // - Data fetching
  // - Sentiment calculation
  // - Template building (hardcoded)
  // - OpenAI calling
  // - Firestore saving
  // - Error handling
});
```

### Proposed (modular, ~200 lines)
```typescript
// functions/src/intelligence/quick-brief.ts
import { TemplateLoader } from './shared/template-loader';
import { DataFetcher } from './shared/data-fetcher';
import { SentimentCalculator } from './shared/sentiment-calculator';
import { OpenAIClient } from './shared/openai-client';

export const generateQuickBrief = onRequest(async (req, res) => {
  // 1. Validate request
  const { keyword, briefType, timeRange, userId } = validateRequest(req.body);

  // 2. Fetch data
  const articles = await DataFetcher.fetchArticles(keyword, timeRange);

  // 3. Calculate sentiment
  const sentiment = SentimentCalculator.calculate(articles);

  // 4. Load template
  const template = await TemplateLoader.loadTemplate(briefType, 'quick-brief');

  // 5. Prepare template data
  const templateData = {
    CLIENT_NAME: keyword,
    TOTAL_MENTIONS: articles.length,
    SENTIMENT_SCORE: sentiment.breakdown,
    // ... all other variables
  };

  // 6. Process template
  const { systemPrompt, userPrompt } = TemplateLoader.processTemplate(
    template,
    templateData
  );

  // 7. Call OpenAI
  const content = await OpenAIClient.generate(systemPrompt, userPrompt);

  // 8. Save to Firestore
  const briefId = await saveBrief(userId, keyword, content);

  // 9. Return response
  res.json({ briefId, content });
});
```

---

## REFACTORED CUSTOM REPORT

### Current (1,075 lines frontend + 395 lines backend)
```typescript
// src/lib/services/report-generator.ts - 1,075 lines
function getBusinessIntelligenceTemplate() {
  return `hardcoded template...`;
}
// ... 6 more hardcoded templates

// functions/src/pr-report-generator.ts - 395 lines
export const generatePRReport = onCall(async (request) => {
  // Hardcoded stakeholder template
  // Only works for one audience type
});
```

### Proposed (unified, ~150 lines total)
```typescript
// functions/src/intelligence/custom-report.ts
import { TemplateLoader } from './shared/template-loader';
import { OpenAIClient } from './shared/openai-client';

export const generateCustomReport = onCall(async (request) => {
  const { briefItems, clientName, audienceType } = request.data;

  // 1. Load template
  const template = await TemplateLoader.loadTemplate(
    audienceType,
    'custom-report'
  );

  // 2. Prepare data from user's brief items
  const templateData = prepareDataFromBriefItems(briefItems, clientName);

  // 3. Process template
  const { systemPrompt, userPrompt } = TemplateLoader.processTemplate(
    template,
    templateData
  );

  // 4. Call OpenAI
  const content = await OpenAIClient.generate(systemPrompt, userPrompt);

  // 5. Return report
  return { content };
});

// Frontend becomes simple API client
// src/lib/services/intelligence/custom-report-client.ts
export async function generateCustomReport(
  briefItems: BriefItem[],
  clientName: string,
  audienceType: AudienceType
): Promise<string> {
  const generatePRReport = httpsCallable(functions, 'generateCustomReport');
  const result = await generatePRReport({ briefItems, clientName, audienceType });
  return result.data.content;
}
```

---

## BENEFITS

### For Developers

| Task | Current | Proposed | Improvement |
|------|---------|----------|-------------|
| Add new audience type | 5 files, 4 hours | 1 file, 30 min | **8x faster** |
| Update template | 3 locations | 1 location | **3x simpler** |
| Test template | Manual only | Automated | **∞x better** |
| Find template | Grep 4,500 lines | Open 1 file | **10x faster** |

### For Template Quality
- ✅ Single source of truth prevents drift
- ✅ Validation catches errors before deployment
- ✅ Version control tracks all changes
- ✅ Automated testing ensures consistency

### For Maintenance
- ✅ Reduce codebase by ~2,000 lines
- ✅ Eliminate duplication
- ✅ Improve code organization
- ✅ Easier onboarding for new developers

### For Features
- ✅ Easy to add new audience types
- ✅ A/B testing becomes possible
- ✅ User customization becomes feasible
- ✅ Template marketplace becomes viable

---

## IMPLEMENTATION PLAN

### Phase 1: Foundation (Week 1)
**Goal:** Set up new structure without breaking existing functionality

- [ ] Create `/functions/src/templates/` folder
- [ ] Create `/functions/src/intelligence/` folder
- [ ] Create `/docs/intelligence/` folder
- [ ] Define template file format and schema
- [ ] Build TemplateLoader class
- [ ] Write template validation tests

**Deliverable:** Template loading system working with 1 test template

---

### Phase 2: Template Migration (Week 2)
**Goal:** Extract all templates to external files

- [ ] Extract Stakeholder Communications template → `/templates/quick-brief/stakeholder-communications.md`
- [ ] Extract PR Communications template → `/templates/quick-brief/pr-communications.md`
- [ ] Extract all 7 Custom Report templates → `/templates/custom-report/*.md`
- [ ] Validate all templates pass schema checks
- [ ] Document template variables and requirements

**Deliverable:** All 9 templates in standardized format, validated

---

### Phase 3: Quick Brief Refactor (Week 3)
**Goal:** Refactor Quick Brief to use external templates

- [ ] Create `/intelligence/quick-brief.ts`
- [ ] Extract DataFetcher module
- [ ] Extract SentimentCalculator module
- [ ] Extract OpenAIClient module
- [ ] Update Quick Brief to use TemplateLoader
- [ ] Test with Stakeholder and PR templates
- [ ] Deploy and validate no regressions

**Deliverable:** Quick Brief working with external templates

---

### Phase 4: Custom Report Refactor (Week 4)
**Goal:** Refactor Custom Report to use external templates

- [ ] Create `/intelligence/custom-report.ts`
- [ ] Migrate backend to use TemplateLoader
- [ ] Update frontend to call new backend
- [ ] Test all 7 audience types
- [ ] Deploy and validate no regressions

**Deliverable:** Custom Report working with external templates

---

### Phase 5: Testing & Documentation (Week 5)
**Goal:** Ensure quality and document new system

- [ ] Write comprehensive tests for template system
- [ ] Add CI/CD template validation
- [ ] Write developer documentation
- [ ] Write template contribution guide
- [ ] Create "Adding New Audience Type" tutorial
- [ ] Update architecture diagrams

**Deliverable:** Fully tested, documented system

---

### Phase 6: Cleanup (Week 6)
**Goal:** Remove old code and organize

- [ ] Delete old template code from quick-brief-generator.ts
- [ ] Delete old template code from report-generator.ts
- [ ] Move old docs to `/docs/archive/`
- [ ] Update all documentation links
- [ ] Final code review and cleanup

**Deliverable:** Clean, production-ready codebase

---

## ROLLBACK PLAN

If issues arise during migration:

1. **Phase 3-4:** Keep old functions alongside new ones with feature flag
2. **Gradual Migration:** Migrate one audience type at a time
3. **Monitoring:** Track error rates and user feedback
4. **Quick Rollback:** Feature flag can instantly revert to old code

---

## VALIDATION STRATEGY

### Template Validation
```typescript
// Automated checks on every template change
✅ Valid YAML front matter
✅ All required sections present
✅ Variable syntax correct ({{VAR_NAME}})
✅ No forbidden language patterns
✅ Expected output structure documented
```

### Integration Testing
```typescript
// Test each template end-to-end
✅ Load template successfully
✅ Process with sample data
✅ Call OpenAI (with test key)
✅ Validate output format
✅ Check output quality
```

### Regression Testing
```typescript
// Ensure no functionality breaks
✅ Quick Brief generates successfully
✅ Custom Report generates successfully
✅ All audience types work
✅ Sentiment calculations correct
✅ Article listings complete
```

---

## SUCCESS CRITERIA

### Code Quality
- ✅ Reduce total codebase by 2,000+ lines
- ✅ Zero template duplication
- ✅ 100% test coverage for template system
- ✅ All tests passing

### Developer Experience
- ✅ Add new audience type in <30 minutes
- ✅ Single file edit to update template
- ✅ Clear documentation for all tasks
- ✅ Automated validation catches errors

### User Experience
- ✅ No regressions in existing functionality
- ✅ All templates produce high-quality output
- ✅ Fast generation times maintained
- ✅ Consistent output across report types

---

## RISK MITIGATION

| Risk | Impact | Mitigation |
|------|--------|------------|
| Template loading errors | HIGH | Comprehensive error handling + fallback to hardcoded |
| Performance degradation | MEDIUM | Cache loaded templates + benchmark tests |
| Breaking changes | HIGH | Feature flags + gradual rollout + monitoring |
| Template validation too strict | LOW | Configurable validation rules + override option |
| Developer confusion | MEDIUM | Clear docs + examples + migration guide |

---

## FUTURE ENHANCEMENTS

### After Standardization Complete

1. **Template Versioning** (v2.0)
   - Track template versions in database
   - Allow rollback to previous versions
   - A/B test different template versions

2. **User Customization** (v2.1)
   - Users can create custom templates
   - Save personal template preferences
   - Share templates with team

3. **Template Marketplace** (v3.0)
   - Community-contributed templates
   - Template ratings and reviews
   - Template analytics and performance tracking

4. **AI Template Optimization** (v3.1)
   - Auto-optimize templates based on usage
   - Suggest improvements
   - Auto-generate templates for new use cases

---

## COST-BENEFIT ANALYSIS

### Investment Required
- **Developer Time:** 6 weeks (1 developer)
- **Testing Time:** 2 weeks
- **Risk:** Medium (mitigated with feature flags)

### Returns Expected
- **Maintenance Savings:** 50% reduction in template update time
- **Feature Velocity:** 8x faster to add new audience types
- **Code Quality:** 40% reduction in codebase size
- **Developer Onboarding:** 70% faster for new team members

### ROI
- **Break-even:** After adding 2-3 new audience types (~2 months)
- **Long-term Value:** Enables features not possible with current architecture

---

## APPROVAL & NEXT STEPS

### Required Approvals
- [ ] Technical Lead - Architecture review
- [ ] Product Manager - Feature impact assessment
- [ ] Engineering Manager - Resource allocation

### Questions to Resolve
1. Do we proceed with all 6 phases or start with Phase 1-2 proof of concept?
2. Do we want gradual migration (safer) or all-at-once (faster)?
3. Which audience types should be prioritized for testing?
4. Do we need backward compatibility with old template format?

### Next Steps After Approval
1. Create detailed technical design document
2. Set up project tracking (GitHub issues/Jira)
3. Schedule kickoff meeting
4. Begin Phase 1 implementation

---

**Status:** 🟡 AWAITING APPROVAL

**Recommendation:** ✅ APPROVE - High value, manageable risk, clear path forward

---

END OF PROPOSAL
