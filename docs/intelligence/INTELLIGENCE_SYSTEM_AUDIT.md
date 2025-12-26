# INTELLIGENCE SYSTEM AUDIT
**Comprehensive Analysis of Quick Brief & Custom Report Systems**

**Generated:** October 11, 2025
**Purpose:** Audit current state before standardization and expansion

---

## EXECUTIVE SUMMARY

Perception has **TWO parallel intelligence report generation systems**:

1. **Quick Brief** - Fast, AI-generated briefs from BigQuery data (accessed via home page hover)
2. **Custom Report** - User-curated reports with manual item selection (accessed via Intelligence page)

Both systems use OpenAI templates but have **inconsistent organization**, **duplicate code**, and **no standardized template management**. This audit identifies the current state and proposes a robust, scalable architecture.

---

## SYSTEM COMPARISON

| Aspect | Quick Brief | Custom Report |
|--------|-------------|---------------|
| **Entry Point** | Home page keyword hover | Intelligence page |
| **Data Source** | BigQuery (automatic) | Manual curation (user adds items) |
| **Backend** | `/functions/src/quick-brief-generator.ts` (3,113 lines) | `/functions/src/pr-report-generator.ts` (395 lines) |
| **Frontend Service** | N/A (direct call) | `/src/lib/services/report-generator.ts` (1,075 lines) |
| **Template Location** | **Hardcoded inline in function** | **Hardcoded inline in frontend service** |
| **Documentation** | `/docs/quick-brief/` (8 files) | `/docs/report-templates/` (8 files) |
| **Template Files** | 1 MD file (Stakeholder only) | 7 MD files (all audience types) |
| **OpenAI Usage** | Yes (GPT-4o) | Yes (GPT-4o) |
| **Audience Types** | 2 active (PR, Stakeholder) + 4 coming soon | 7 types (all active) |

---

## CURRENT FILE STRUCTURE

```
perception/
├── docs/
│   ├── quick-brief/                         ← Quick Brief docs
│   │   ├── README.md
│   │   ├── STAKEHOLDER_TEMPLATE.md          ← Only template doc
│   │   ├── TECHNICAL_DETAILS.md
│   │   ├── VERSION_HISTORY.md
│   │   ├── ORGANIZATION_SUMMARY.md
│   │   └── samples/
│   │
│   └── report-templates/                    ← Custom Report docs
│       ├── README.md
│       ├── business-intelligence.md         ← Template docs
│       ├── pr-communications.md             ← Template docs
│       ├── c-suite-executive.md             ← Template docs
│       ├── investor-relations.md            ← Template docs
│       ├── marketing-team.md                ← Template docs
│       ├── business-development.md          ← Template docs
│       └── product-team.md                  ← Template docs
│
├── functions/
│   ├── src/
│   │   ├── quick-brief-generator.ts         ← 3,113 lines (Quick Brief backend)
│   │   │   ├── buildStakeholderBriefPrompt()   [Lines 2087-2335]
│   │   │   └── buildPRBriefPrompt()            [Lines 1258-1814]
│   │   │
│   │   └── pr-report-generator.ts           ← 395 lines (Custom Report backend)
│   │       └── Uses hardcoded prompt (stakeholder only) [Lines 122-230]
│   │
│   ├── STAKEHOLDER_BRIEF_FIXES.md           ← Recent deployment docs
│   └── monitor-new-briefs.js
│
└── src/
    └── lib/
        └── services/
            └── report-generator.ts          ← 1,075 lines (Custom Report frontend)
                ├── getBusinessIntelligenceTemplate()  [Lines 101-169]
                ├── getProductTeamTemplate()           [Lines 171-225]
                ├── getBusinessDevelopmentTemplate()   [Lines 227-293]
                ├── getMarketingTeamTemplate()         [Lines 295-340]
                ├── getPRCommunicationsTemplate()      [Lines 342-387]
                ├── getInvestorRelationsTemplate()     [Lines 389-434]
                └── getExecutiveTemplate()             [Lines 436-490]
```

---

## CRITICAL FINDINGS

### 🔴 PROBLEM 1: TEMPLATE DUPLICATION

**Issue:** Templates exist in THREE different places with NO synchronization

1. **Documentation templates** (`/docs/report-templates/*.md`) - 7 files
   - Used as: Reference documentation only
   - Status: Well-documented, detailed
   - Problem: NOT used by code

2. **Quick Brief inline templates** (`/functions/src/quick-brief-generator.ts`) - 2 types
   - Used by: Backend Cloud Function
   - Status: Working, recently updated
   - Problem: Hardcoded, difficult to maintain

3. **Custom Report inline templates** (`/src/lib/services/report-generator.ts`) - 7 types
   - Used by: Frontend service
   - Status: Working but outdated
   - Problem: Hardcoded, no reference to docs

**Impact:**
- ❌ Updating a template requires changes in 2-3 places
- ❌ Templates drift out of sync
- ❌ No single source of truth
- ❌ Difficult to add new audience types

---

### 🔴 PROBLEM 2: INCONSISTENT ARCHITECTURE

**Quick Brief Flow:**
```
User Action → Backend Function (quick-brief-generator.ts)
                     ↓
              BigQuery Data Fetch
                     ↓
              AI Prompt Generation (inline template)
                     ↓
              OpenAI API Call
                     ↓
              Firestore Save
                     ↓
              Return Brief ID
```

**Custom Report Flow:**
```
User Action → Frontend Service (report-generator.ts)
                     ↓
              Template Selection (inline template)
                     ↓
              Variable Substitution (no AI)
                     ↓
              Return Markdown
                     ↓
              Send to Backend (pr-report-generator.ts)
                     ↓
              AI Enhancement (stakeholder template only)
                     ↓
              Return Final Report
```

**Problem:** Different architectures make it hard to share code and maintain consistency.

---

### 🔴 PROBLEM 3: TEMPLATE DOCUMENTATION MISMATCH

| Audience Type | Doc Template | Quick Brief Code | Custom Report Code |
|---------------|--------------|------------------|-------------------|
| Business Intelligence | ✅ `/docs/report-templates/business-intelligence.md` | ❌ Not implemented | ✅ Inline function |
| PR Communications | ✅ `/docs/report-templates/pr-communications.md` | ✅ Inline function | ✅ Inline function |
| Stakeholder Comms | ✅ `/docs/quick-brief/STAKEHOLDER_TEMPLATE.md` | ✅ Inline function | ⚠️ Backend only |
| C-Suite Executive | ✅ `/docs/report-templates/c-suite-executive.md` | ❌ Not implemented | ✅ Inline function |
| Marketing Team | ✅ `/docs/report-templates/marketing-team.md` | ❌ Not implemented | ✅ Inline function |
| Business Dev | ✅ `/docs/report-templates/business-development.md` | ❌ Not implemented | ✅ Inline function |
| Investor Relations | ✅ `/docs/report-templates/investor-relations.md` | ❌ Not implemented | ✅ Inline function |
| Product Team | ✅ `/docs/report-templates/product-team.md` | ❌ Not implemented | ✅ Inline function |

**Problem:**
- Documentation exists but isn't referenced by code
- Quick Brief only has 2 templates vs 7 documented
- No clear process to add new templates

---

### 🔴 PROBLEM 4: NO TEMPLATE VERSIONING

**Current State:**
- Templates are modified directly in code
- No version history
- No way to rollback to previous template
- No testing framework for template changes

**Impact:**
- ❌ Breaking changes can go unnoticed
- ❌ Can't A/B test templates
- ❌ No audit trail of template changes

---

### 🟢 WHAT'S WORKING WELL

1. **Documentation Quality** - Both `/docs/quick-brief/` and `/docs/report-templates/` are well-documented
2. **Recent Stakeholder Template** - Thoroughly tested, validated, production-ready
3. **OpenAI Integration** - Stable and reliable in both systems
4. **Sentiment Calculations** - Recently fixed and validated
5. **Data Validation** - Added logging and verification

---

## GAPS & MISSING PIECES

### Quick Brief System
- ❌ Only 2 active templates (PR, Stakeholder) vs 7 documented
- ❌ No template reference files (except Stakeholder)
- ❌ Templates hardcoded in 3,113-line function
- ❌ No easy way to add new audience types
- ✅ BigQuery integration working
- ✅ Sentiment validation working
- ✅ Recently deployed and tested

### Custom Report System
- ❌ 7 templates hardcoded in frontend (1,075 lines)
- ❌ Backend only supports stakeholder template
- ❌ Frontend templates don't match doc templates
- ❌ No template validation
- ❌ No AI enhancement for most audience types
- ✅ User curation working
- ✅ Report editor working

### Documentation
- ❌ Templates in `/docs/report-templates/` not used by code
- ❌ No unified template system documentation
- ❌ No template contribution guide
- ⚠️ Quick Brief docs separate from Custom Report docs
- ✅ Individual templates well-documented
- ✅ Technical details documented

---

## TECHNICAL DEBT

### Code Duplication
- **Sentiment Calculation:** Duplicated in 3 places
- **Article Formatting:** Duplicated in 2 places
- **OpenAI Integration:** Duplicated in 2 functions
- **Template Processing:** Different logic in each system

### Maintenance Burden
- **3,113 lines** in quick-brief-generator.ts (should be modularized)
- **1,075 lines** in report-generator.ts (should use external templates)
- **395 lines** in pr-report-generator.ts (should support all audience types)

### Scalability Issues
- Adding a new audience type requires:
  1. Update Quick Brief function (hardcode template)
  2. Update Custom Report frontend service (hardcode template)
  3. Update Custom Report backend (hardcode template)
  4. Update documentation (create MD file)
  5. Update UI (add button/option)

  **Total:** 5 files in 3 different locations

---

## RISKS

### High Risk
- **Inconsistent Output:** Same audience type produces different reports in Quick Brief vs Custom Report
- **Broken Templates:** Changes to one template don't propagate to others
- **Maintenance Overhead:** Every template change requires multiple file edits

### Medium Risk
- **Developer Confusion:** New developers don't know which template to use
- **Template Drift:** Templates diverge over time with no detection
- **Testing Gaps:** No automated testing of template output

### Low Risk
- **Documentation Staleness:** Docs become outdated as code changes
- **Version Confusion:** No clear "current" version of each template

---

## OPPORTUNITIES

### Quick Wins
1. **Extract templates to separate files** - Make templates reusable
2. **Create unified template system** - Single source of truth
3. **Add template validation** - Ensure consistency

### Strategic Improvements
1. **Modularize quick-brief-generator.ts** - Break into smaller functions
2. **Unify architecture** - Make Quick Brief and Custom Report use same backend
3. **Add template versioning** - Track changes over time

### Future Enhancements
1. **Template testing framework** - Automated validation
2. **A/B testing system** - Compare template performance
3. **User customization** - Allow users to modify templates

---

## RECOMMENDATIONS

### Immediate Actions (Next Sprint)
1. ✅ Complete this audit
2. 📋 Design standardized folder structure
3. 📋 Extract templates to external files
4. 📋 Create template loading system
5. 📋 Document template contribution process

### Short-Term (Next Month)
1. Migrate Quick Brief to use external templates
2. Migrate Custom Report to use external templates
3. Add template validation
4. Create template testing framework
5. Unify documentation

### Long-Term (Next Quarter)
1. Unify Quick Brief and Custom Report architecture
2. Add template versioning system
3. Create template marketplace/library
4. Add user template customization
5. Implement A/B testing

---

## SUCCESS METRICS

### Template System Health
- ✅ All templates extracted to external files
- ✅ Single source of truth for each template
- ✅ Automated validation passing
- ✅ 100% code coverage for template loading

### Developer Experience
- ⏱️ Time to add new template: < 30 minutes (currently ~4 hours)
- 📄 Files to modify: 1 (currently 5)
- 🧪 Tests passing: 100%

### Code Quality
- 📉 Reduce quick-brief-generator.ts from 3,113 to <1,500 lines
- 📉 Reduce report-generator.ts from 1,075 to <500 lines
- 📉 Reduce template duplication from 3x to 1x

---

## NEXT STEPS

1. **Review this audit** with stakeholders
2. **Approve standardization plan**
3. **Design unified template architecture**
4. **Create implementation roadmap**
5. **Begin extraction of templates**

---

**Status:** 🟡 Audit Complete - Awaiting Approval for Standardization Work

**Estimated Effort:**
- Template extraction: 2-3 days
- Architecture unification: 5-7 days
- Testing framework: 3-5 days
- Documentation: 2-3 days

**Total:** ~12-18 days for complete standardization

---

END OF AUDIT
