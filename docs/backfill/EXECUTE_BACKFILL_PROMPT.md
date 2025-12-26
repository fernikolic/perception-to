# Execute Trends Backfill - Complete Prompt

**Use this prompt when you're ready to backfill historical trends data for an enterprise customer.**

---

## 🚀 PROMPT TO USE

```
I need to execute a trends backfill for [DATE_RANGE]. Here's what I need:

BACKFILL DETAILS:
- Date range: [SPECIFY: e.g., "last 30 days" or "May 1 - October 31, 2025" or "last 7 days"]
- Purpose: [SPECIFY: e.g., "enterprise customer demo", "API launch", "research customer"]
- Budget approved: [SPECIFY: e.g., "$30" or "up to $100"]

REQUIREMENTS:
1. Create/adapt the backfill script for my date range
2. Process chronologically (oldest → newest) using v3.1 context-aware logic
3. Make it auto-resumable with progress tracking
4. Include cost monitoring
5. Provide monitoring commands I can use while it runs
6. Give me validation queries to check results

EXECUTION PLAN NEEDED:
- Script location and setup commands
- How to run it (foreground vs background)
- How to monitor progress
- How to validate results
- How to check API access to backfilled data

CONTEXT:
- I have existing backfill scripts at: /Users/fernandonikolic/perception/scripts/backfill/
- Production extraction is at: /Users/fernandonikolic/perception/functions/btc-trends-ui-deployment/index.js
- Environment: Google Cloud + BigQuery + OpenAI GPT-4o-mini
- System version: v3.1 context-aware (as of Nov 21, 2025)

Please create the script, give me the exact commands to run, and provide monitoring/validation steps.
```

---

## 📋 REFERENCE: Common Backfill Scenarios

### Scenario 1: Last 30 Days (Recommended for Enterprise Demo)

```
I need to execute a trends backfill for the last 30 days. Here's what I need:

BACKFILL DETAILS:
- Date range: Last 30 days from today
- Purpose: Enterprise customer evaluating API for purchase decision
- Budget approved: $30

REQUIREMENTS:
1. Create/adapt the backfill script for 30-day range
2. Process chronologically (oldest → newest) using v3.1 context-aware logic
3. Make it auto-resumable with progress tracking
4. Include cost monitoring
5. Provide monitoring commands I can use while it runs
6. Give me validation queries to check results

EXECUTION PLAN NEEDED:
- Script location and setup commands
- How to run it in background (overnight)
- How to monitor progress
- How to validate results
- How to check API access to backfilled data

CONTEXT:
- I have existing backfill scripts at: /Users/fernandonikolic/perception/scripts/backfill/
- Production extraction is at: /Users/fernandonikolic/perception/functions/btc-trends-ui-deployment/index.js
- Environment: Google Cloud + BigQuery + OpenAI GPT-4o-mini
- System version: v3.1 context-aware (as of Nov 21, 2025)

Please create the script, give me the exact commands to run, and provide monitoring/validation steps.
```

**Expected Output:** ~600-900 trends, $21-28 cost, 15-hour processing time

---

### Scenario 2: 6 Months (May - October 2025)

```
I need to execute a trends backfill for May 1 - October 31, 2025. Here's what I need:

BACKFILL DETAILS:
- Date range: May 1, 2025 to October 31, 2025 (6 months)
- Purpose: Research customer needs comprehensive historical dataset
- Budget approved: $100

REQUIREMENTS:
1. Use existing 6-month backfill script (backfill-v4-trends-6months.cjs)
2. Verify it uses v3.1 context-aware logic or update if needed
3. Confirm it's auto-resumable with progress tracking
4. Provide monitoring commands I can use while it runs
5. Give me validation queries to check results

EXECUTION PLAN NEEDED:
- Exact commands to run the existing script
- How to run it in background (overnight)
- How to monitor progress
- How to validate results
- How to check API access to backfilled data

CONTEXT:
- Existing script: /Users/fernandonikolic/perception/scripts/backfill/backfill-v4-trends-6months.cjs
- Documentation: /Users/fernandonikolic/perception/docs/backfill/BACKFILL_V4_6MONTHS.md
- Production extraction: /Users/fernandonikolic/perception/functions/btc-trends-ui-deployment/index.js
- Environment: Google Cloud + BigQuery + OpenAI GPT-4o-mini
- System version: v3.1 context-aware (as of Nov 21, 2025)

Please verify the script is up-to-date, give me the exact commands to run, and provide monitoring/validation steps.
```

**Expected Output:** ~1,700-2,000 trends, $85-95 cost, 6-8 hour processing time

---

### Scenario 3: Last 7 Days (Quick Test)

```
I need to execute a trends backfill for the last 7 days. Here's what I need:

BACKFILL DETAILS:
- Date range: Last 7 days from today
- Purpose: Test backfill system before larger enterprise commitment
- Budget approved: $10

REQUIREMENTS:
1. Create/adapt the backfill script for 7-day range
2. Process chronologically (oldest → newest) using v3.1 context-aware logic
3. Make it auto-resumable with progress tracking
4. Include cost monitoring
5. Provide monitoring commands I can use while it runs
6. Give me validation queries to check results

EXECUTION PLAN NEEDED:
- Script location and setup commands
- How to run it (can be foreground for testing)
- How to monitor progress
- How to validate results
- How to check API access to backfilled data

CONTEXT:
- I have existing backfill scripts at: /Users/fernandonikolic/perception/scripts/backfill/
- Production extraction is at: /Users/fernandonikolic/perception/functions/btc-trends-ui-deployment/index.js
- Environment: Google Cloud + BigQuery + OpenAI GPT-4o-mini
- System version: v3.1 context-aware (as of Nov 21, 2025)

Please create the script, give me the exact commands to run, and provide monitoring/validation steps.
```

**Expected Output:** ~140-210 trends, $7-10 cost, 3-4 hour processing time

---

### Scenario 4: Custom Date Range

```
I need to execute a trends backfill for [START_DATE] to [END_DATE]. Here's what I need:

BACKFILL DETAILS:
- Date range: [START_DATE] to [END_DATE]
- Purpose: [YOUR_PURPOSE]
- Budget approved: [YOUR_BUDGET]

REQUIREMENTS:
1. Create/adapt the backfill script for custom date range
2. Process chronologically (oldest → newest) using v3.1 context-aware logic
3. Make it auto-resumable with progress tracking
4. Include cost monitoring
5. Provide monitoring commands I can use while it runs
6. Give me validation queries to check results

EXECUTION PLAN NEEDED:
- Script location and setup commands
- How to run it (specify foreground or background preference)
- How to monitor progress
- How to validate results
- How to check API access to backfilled data

CONTEXT:
- I have existing backfill scripts at: /Users/fernandonikolic/perception/scripts/backfill/
- Production extraction is at: /Users/fernandonikolic/perception/functions/btc-trends-ui-deployment/index.js
- Environment: Google Cloud + BigQuery + OpenAI GPT-4o-mini
- System version: v3.1 context-aware (as of Nov 21, 2025)

Please create the script, give me the exact commands to run, and provide monitoring/validation steps.
```

---

## 🎯 QUICK REFERENCE: What Claude Will Do

When you use the prompt above, Claude will:

1. **Create or adapt the backfill script** for your date range
2. **Provide exact setup commands** including environment variables
3. **Give you run commands** for foreground, background, or screen/tmux
4. **Provide monitoring commands:**
   - Check if still running
   - View progress file
   - Watch live logs
   - Check current cost
5. **Provide validation queries:**
   - Count trends by date
   - Check average articles per trend
   - Sample quality check
   - Verify API access
6. **Give you cleanup commands** if needed

---

## 📁 IMPORTANT PATHS TO REFERENCE

**Existing Scripts:**
```
/Users/fernandonikolic/perception/scripts/backfill/backfill-v4-trends-6months.cjs
/Users/fernandonikolic/perception/scripts/backfill/backfill-trends-6months.cjs
```

**Documentation:**
```
/Users/fernandonikolic/perception/docs/backfill/TRENDS_BACKFILL_ENTERPRISE_READY.md
/Users/fernandonikolic/perception/docs/backfill/BACKFILL_V4_6MONTHS.md
/Users/fernandonikolic/perception/docs/backfill/BACKFILL_QUICK_REFERENCE.md
```

**Production Code:**
```
/Users/fernandonikolic/perception/functions/btc-trends-ui-deployment/index.js
```

**Environment:**
```
GOOGLE_APPLICATION_CREDENTIALS=/Users/fernandonikolic/perception/functions/bitcoin-data-chat-key.json
OPENAI_API_KEY_V2 (in environment)
```

---

## ✅ PRE-FLIGHT CHECKLIST

Before using the prompt, verify:

- [ ] You know the date range needed
- [ ] Customer has approved the budget
- [ ] You have purpose/use case clear
- [ ] Environment variables are set (GOOGLE_APPLICATION_CREDENTIALS, OPENAI_API_KEY_V2)
- [ ] BigQuery access works: `bq ls triple-upgrade-245423:btcp_main_dataset`
- [ ] You have time to monitor (at least check in periodically)

---

## 💡 TIPS

**For best results:**
1. Be specific about date range (use exact dates or "last X days")
2. State your purpose clearly (helps Claude optimize the solution)
3. Mention your budget (helps with cost validation)
4. Specify if you need to run in background vs can watch it
5. Ask for validation queries upfront (don't wait until after)

**Cost estimates:**
- $3-5 per day of data
- 7 days ≈ $7-10
- 30 days ≈ $21-28
- 6 months ≈ $85-95

**Time estimates:**
- ~1 hour per week of data
- 7 days ≈ 3-4 hours
- 30 days ≈ 15-20 hours
- 6 months ≈ 6-8 hours (batched monthly)

---

## 🔄 IF YOU NEED TO STOP/RESUME

The script will save progress automatically. To resume:

```
I need to resume a trends backfill that was stopped.

The backfill was for: [DATE_RANGE]
Progress file location: /Users/fernandonikolic/perception/data/[backfill-progress-file].json

Please:
1. Check the progress file to see what's been completed
2. Give me the command to resume from where it left off
3. Provide monitoring commands to track the resumed execution

CONTEXT:
- Original script: [SCRIPT_PATH]
- Environment: Google Cloud + BigQuery + OpenAI GPT-4o-mini
```

---

**This document contains everything you need to execute a trends backfill when ready.**

Just copy the appropriate scenario prompt above and fill in the bracketed values.
