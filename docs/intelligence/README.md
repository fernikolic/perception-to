# INTELLIGENCE SYSTEM DOCUMENTATION
**Unified Documentation for Quick Brief & Custom Report Systems**

**Last Updated:** October 11, 2025
**Status:** 📚 Centralized Documentation Hub

---

## 📖 OVERVIEW

This folder contains all documentation for Perception's intelligence report generation systems:
- **Quick Brief** - AI-generated briefs from BigQuery data (home page)
- **Custom Report** - User-curated reports (Intelligence page)

Both systems use OpenAI with detailed prompt templates to generate expert-level analysis for different personas.

---

## 🗂️ FOLDER STRUCTURE

```
/docs/intelligence/
├── README.md                           ← You are here
├── AUDIT_SUMMARY.md                    ← Executive summary (start here!)
├── INTELLIGENCE_SYSTEM_AUDIT.md        ← Complete technical audit
├── STANDARDIZATION_PROPOSAL.md         ← Implementation plan
├── TEMPLATE_QUICK_START.md             ← Developer guide
├── TEMPLATE_SYSTEM_VISION.md           ← Super-detailed template vision
│
├── templates/                          ← Template documentation (current)
│   ├── README.md                       ← Template overview
│   ├── stakeholder-communications.md   ← Stakeholder template
│   ├── pr-communications.md            ← PR template
│   ├── business-intelligence.md        ← Business intel template
│   ├── c-suite-executive.md            ← C-suite template
│   ├── marketing-team.md               ← Marketing template
│   ├── business-development.md         ← Business dev template
│   ├── investor-relations.md           ← Investor relations template
│   └── product-team.md                 ← Product team template
│
└── archive/                            ← Old documentation (reference only)
    ├── quick-brief/                    ← Original Quick Brief docs
    └── report-templates/               ← Original Custom Report docs
```

---

## 🚀 QUICK START

### For Executives / Decision Makers
**Read:** `AUDIT_SUMMARY.md` (5 minutes)

**Key Points:**
- We have 2 intelligence systems with duplicate templates
- Proposal: Unify into single template system
- Impact: 88% faster to add new personas, 45% less code
- Decision needed: Approve standardization?

---

### For Technical Leads
**Read in order:**
1. `INTELLIGENCE_SYSTEM_AUDIT.md` - Current state analysis (15 min)
2. `STANDARDIZATION_PROPOSAL.md` - Implementation plan (20 min)
3. `TEMPLATE_SYSTEM_VISION.md` - Super-detailed template vision (10 min)

**Key Points:**
- Templates hardcoded in 3 places (4,583 lines total)
- Proposed: Extract to external files with template loader
- 6-week implementation plan with phases
- Feature flags for safe rollout

---

### For Developers
**Read:** `TEMPLATE_QUICK_START.md` (10 minutes)

**Key Points:**
- How to work with templates today (before standardization)
- How it will work after standardization
- Common tasks: update template, add new persona
- Troubleshooting guide

**Current Workflow (Before Standardization):**
1. Edit documentation: `/docs/intelligence/templates/[persona].md`
2. Edit Quick Brief code: `/functions/src/quick-brief-generator.ts`
3. Edit Custom Report code: `/src/lib/services/report-generator.ts`
4. Build and deploy

**Future Workflow (After Standardization):**
1. Edit template file: `/functions/src/templates/quick-brief/[persona].md`
2. Validate: `npm run validate-templates`
3. Deploy: `npm run deploy`

---

### For Template Writers
**Read:** `TEMPLATE_SYSTEM_VISION.md` (10 minutes)

**Key Points:**
- Templates are NOT static report generators
- Templates are SUPER-DETAILED PROMPTS that teach OpenAI to be an expert analyst
- Each template should include:
  - Complete BigQuery schema explanation
  - Persona psychology (who they are, what they care about)
  - Advanced analysis frameworks
  - Output quality standards with examples
  - Vocabulary and tone guidelines

**Template Quality Bar:**
- Output should be indistinguishable from a $300/hour expert analyst
- Users should be able to use output directly without major edits
- Templates should be 500-1000+ lines of detailed prompt engineering

---

## 📋 DOCUMENT DESCRIPTIONS

### Core Planning Documents

#### `AUDIT_SUMMARY.md`
**Purpose:** Executive decision-making
**Length:** 5-minute read
**Contains:**
- The problem (templates in 3 places)
- The solution (unified template system)
- The numbers (88% faster, 45% less code)
- Decision framework (approve / proof of concept / status quo)
- Recommendation (approve full standardization)

---

#### `INTELLIGENCE_SYSTEM_AUDIT.md`
**Purpose:** Complete technical analysis
**Length:** 15-minute read
**Contains:**
- Current file structure with line counts
- Template location mapping
- Gap analysis (what's missing, what's duplicated)
- Technical debt assessment
- Risk analysis
- Opportunities for improvement

**Key Findings:**
- Quick Brief: 3,113 lines, 2 templates (PR, Stakeholder)
- Custom Report: 1,075 + 395 lines, 7 templates (all personas)
- Templates exist in docs but aren't used by code
- No template versioning or testing framework

---

#### `STANDARDIZATION_PROPOSAL.md`
**Purpose:** Implementation roadmap
**Length:** 20-minute read
**Contains:**
- Proposed unified architecture
- 6-week implementation plan (phases 1-6)
- Code examples (before/after comparison)
- Template loader design
- Risk mitigation strategy
- Success criteria and ROI

**Implementation Phases:**
1. Foundation (Week 1) - Template loading system
2. Template Migration (Week 2) - Extract all templates
3. Quick Brief Refactor (Week 3) - Use external templates
4. Custom Report Refactor (Week 4) - Unify backend
5. Testing & Documentation (Week 5) - Quality assurance
6. Cleanup (Week 6) - Remove old code

---

#### `TEMPLATE_QUICK_START.md`
**Purpose:** Developer quick reference
**Length:** 10-minute read
**Contains:**
- How templates work today vs future
- Adding new audience type (current: 4-6 hours → future: 30 min)
- Common tasks with step-by-step instructions
- Troubleshooting guide
- Best practices

**Use Cases:**
- "How do I update a template?"
- "How do I add a new persona?"
- "Template not loading - what's wrong?"
- "How do I test template changes?"

---

#### `TEMPLATE_SYSTEM_VISION.md`
**Purpose:** Super-detailed template vision
**Length:** 10-minute read
**Contains:**
- What templates really are (detailed prompts, not static generators)
- Why super-detailed matters (expert-level output)
- Template structure breakdown
- Full example: PR Communications template
- Quality standards and success criteria

**Key Insight:**
Templates teach OpenAI to "become" an expert analyst for each persona by providing:
- Complete data schema interpretation
- Persona psychology and decision context
- Advanced analysis methodologies
- Output quality standards with examples

---

### Template Documentation

#### `/templates/*.md` (8 files)
**Purpose:** Current template documentation (reference)
**Status:** ⚠️ Not currently used by code
**Contents:**
- Business Intelligence
- PR Communications
- C-Suite Executive
- Marketing Team
- Business Development
- Investor Relations
- Product Team
- Stakeholder Communications (from Quick Brief)

**Note:** These are good documentation but need to be evolved into super-detailed prompt engineering documents as described in `TEMPLATE_SYSTEM_VISION.md`.

---

## 🎯 CURRENT STATUS

### ✅ What's Done
- Comprehensive audit completed
- Standardization plan designed
- Template vision documented
- All docs centralized in `/docs/intelligence/`
- Archive of old docs preserved

### ⏳ What's Next
- **Decision Required:** Approve standardization plan?
- **Template Enhancement:** Create super-detailed templates for all personas
- **Implementation:** Begin Phase 1 (Foundation) if approved

### 🚧 What's In Progress
- Template enhancement (waiting for super-detailed templates from stakeholder)

---

## 📊 KEY METRICS

### Current State
- **2 systems:** Quick Brief + Custom Report
- **3 locations:** Templates hardcoded in 3 different files
- **4,583 lines:** Total template code
- **4-6 hours:** Time to add new persona
- **7 personas:** Documented (8 including Stakeholder)

### Proposed State
- **1 system:** Unified template architecture
- **1 location:** External template files
- **~2,500 lines:** Reduced codebase (45% reduction)
- **30 minutes:** Time to add new persona (88% faster)
- **Unlimited personas:** Easy to scale

---

## 🔗 RELATED DOCUMENTATION

### In This Folder
- All intelligence system docs (current folder)

### In Other Locations
- **Quick Brief Code:** `/functions/src/quick-brief-generator.ts`
- **Custom Report Code:** `/src/lib/services/report-generator.ts`
- **PR Report Backend:** `/functions/src/pr-report-generator.ts`
- **Recent Fixes:** `/functions/STAKEHOLDER_BRIEF_FIXES.md`

### Archived
- **Old Quick Brief Docs:** `/docs/intelligence/archive/quick-brief/`
- **Old Report Template Docs:** `/docs/intelligence/archive/report-templates/`

---

## 🎓 LEARNING PATH

### For New Team Members

**Day 1: Understand the System**
1. Read: `AUDIT_SUMMARY.md`
2. Explore: Current codebase (`/functions/src/quick-brief-generator.ts`)
3. Read: One template doc (`/templates/stakeholder-communications.md`)

**Day 2: Deep Dive**
1. Read: `INTELLIGENCE_SYSTEM_AUDIT.md`
2. Read: `TEMPLATE_SYSTEM_VISION.md`
3. Review: Actual generated briefs in production

**Day 3: Implementation Understanding**
1. Read: `STANDARDIZATION_PROPOSAL.md`
2. Read: `TEMPLATE_QUICK_START.md`
3. Try: Update a test template

**Week 2+: Contributing**
- Write or enhance templates
- Participate in standardization implementation
- Review and test generated briefs

---

## 📞 GETTING HELP

### Questions About...

**The System Overall:**
→ Start with `AUDIT_SUMMARY.md`

**Technical Implementation:**
→ See `INTELLIGENCE_SYSTEM_AUDIT.md` or `STANDARDIZATION_PROPOSAL.md`

**Working with Templates:**
→ See `TEMPLATE_QUICK_START.md` or `TEMPLATE_SYSTEM_VISION.md`

**Specific Persona Templates:**
→ See `/templates/[persona].md`

### Contributing

Found an issue? Have a suggestion? Want to enhance a template?

1. Review existing documentation
2. Check if already covered in proposals
3. Create issue or discussion with:
   - Clear description
   - Related documents
   - Proposed solution (if applicable)

---

## 📝 VERSION HISTORY

### October 11, 2025 - Initial Centralization
- Created unified `/docs/intelligence/` folder
- Moved all planning documents here
- Copied all template documentation
- Created this README
- Archived old folder structure

### Coming Soon
- Phase 1 implementation docs (template loader)
- Enhanced super-detailed template examples
- API documentation for template system
- Template testing framework docs

---

## 🎯 GOALS

### Short Term (Next Month)
- ✅ Centralize all intelligence documentation
- ⏳ Get approval for standardization plan
- ⏳ Receive super-detailed templates for all personas
- ⏳ Begin Phase 1 implementation

### Medium Term (Next Quarter)
- ⏳ Complete all 6 phases of standardization
- ⏳ All templates extracted to external files
- ⏳ Template testing framework operational
- ⏳ Developer documentation complete

### Long Term (Next Year)
- ⏳ Template marketplace/library
- ⏳ User custom templates
- ⏳ A/B testing framework
- ⏳ Template performance analytics

---

## 📌 QUICK REFERENCE

| I want to... | Read this... |
|--------------|--------------|
| Understand the problem | `AUDIT_SUMMARY.md` |
| See detailed analysis | `INTELLIGENCE_SYSTEM_AUDIT.md` |
| Learn implementation plan | `STANDARDIZATION_PROPOSAL.md` |
| Work with templates | `TEMPLATE_QUICK_START.md` |
| Understand template vision | `TEMPLATE_SYSTEM_VISION.md` |
| See template examples | `/templates/*.md` |
| Add new persona (current) | `TEMPLATE_QUICK_START.md` → "Current Process" |
| Add new persona (future) | `TEMPLATE_QUICK_START.md` → "Future Process" |

---

**Status:** 🟢 Documentation Centralized and Organized

**Next Action:** Review and approve standardization plan

---

END OF README
