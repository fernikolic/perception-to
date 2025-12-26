# Sector Deep Dive Template - Implementation Status

**Created:** November 5, 2025
**Status:** Backend Complete ✅ | Frontend Pending ⏳

---

## What's Been Built ✅

### 1. Backend Functions (Complete)

#### `/functions/src/utils/sector-kpis.ts`
- Comprehensive KPI definitions for 8 sector types:
  - Mining (hashrate, energy efficiency, fleet size, etc.)
  - Exchanges (volume, users, regulatory status, etc.)
  - Treasuries (BTC holdings, purchase price, accumulation rate, etc.)
  - Payments (transaction volume, merchants, geographic coverage, etc.)
  - Custody (AUC, insurance, regulatory licenses, etc.)
  - Infrastructure (TVL, throughput, developer activity, etc.)
  - DeFi (TVL, DAU, protocol revenue, etc.)
  - Stablecoins (market cap, peg stability, reserve backing, etc.)

#### `/functions/src/utils/sector-data-search.ts`
- 5 specialized Perplexity searches:
  1. Company financial metrics
  2. Sector market size & growth
  3. Recent events & catalysts
  4. Competitive positioning
  5. Forward-looking indicators
- Parallel execution for performance
- Retry logic with exponential backoff
- Citation extraction

#### `/functions/src/sector-deep-dive-generator.ts`
- **3-Step Process:**
  1. Claude analyzes articles → structured JSON
  2. Perplexity fills data gaps → external intelligence
  3. Claude synthesizes final report → Bloomberg-style output
- Email notifications (Brevo integration)
- Graceful degradation (works without Perplexity)
- Async processing pattern
- Error handling

#### `/functions/src/index.ts`
- Function exported and registered

---

## What Needs to Be Built ⏳

### 2. Frontend Integration

#### A. Report Template Selector (`space-detail.tsx`)

**Location:** `/src/components/dashboard/pages/space-detail.tsx`

**Add to template dropdown:**
```typescript
const TEMPLATE_OPTIONS = [
  {
    id: 'pr-pitch-intelligence',
    name: 'PR Pitch Intelligence',
    description: 'Media opportunity analysis for PR teams',
    icon: Sparkles,
    estimatedTime: '3-7 minutes'
  },
  {
    id: 'sector-deep-dive',  // ← ADD THIS
    name: 'Sector Deep Dive',
    description: 'Bloomberg-style sector analysis with comp tables',
    icon: BarChart3,
    estimatedTime: '7-10 minutes'
  },
  {
    id: 'stakeholder-communications',
    name: 'Stakeholder Communications',
    description: 'Board-ready strategic briefing',
    icon: FileText,
    estimatedTime: '5-8 minutes'
  }
];
```

#### B. Sector Configuration Modal

**Create new component:** `/src/components/dashboard/modals/sector-config-modal.tsx`

**Required fields:**
```typescript
interface SectorConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: SectorConfig) => void;
}

interface SectorConfig {
  sectorId: string; // Dropdown selection
  dateRange?: {
    start: Date;
    end: Date;
  };
  focusCompanies?: string[]; // Optional
  customKPIs?: string[]; // Optional
}

const SECTOR_OPTIONS = [
  { id: 'mining', name: 'Bitcoin Mining', icon: '⛏️' },
  { id: 'exchanges', name: 'Crypto Exchanges', icon: '💱' },
  { id: 'treasuries', name: 'Corporate Treasuries', icon: '🏦' },
  { id: 'payments', name: 'Bitcoin Payments', icon: '💳' },
  { id: 'custody', name: 'Institutional Custody', icon: '🔐' },
  { id: 'infrastructure', name: 'Infrastructure & L2s', icon: '🏗️' },
  { id: 'defi', name: 'DeFi Protocols', icon: '🔄' },
  { id: 'stablecoins', name: 'Stablecoins', icon: '💵' }
];
```

**Modal UI:**
1. Sector dropdown (required)
2. Date range picker (auto-populate from Space, allow override)
3. Focus companies (optional text input, comma-separated)
4. Custom KPIs (optional text area, one per line)
5. Submit button → calls backend

#### C. Report Service Integration

**Location:** `/src/lib/services/report-generator.ts`

**Add function:**
```typescript
export async function generateSectorDeepDive(
  briefItems: BriefItem[],
  spaceId: string,
  sectorConfig: SectorConfig
): Promise<void> {
  const { getFunctions, httpsCallable } = await import('@/lib/firebase');
  const functions = getFunctions();

  // Call the backend function
  const generateReport = httpsCallable(
    functions,
    'generateSectorDeepDive'
  );

  const user = auth.currentUser;
  if (!user) throw new Error('User must be authenticated');

  const idToken = await user.getIdToken();

  await generateReport({
    spaceId,
    briefItems,
    sectorConfig
  }, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
}
```

#### D. Progress Message Update

**Location:** `/src/components/dashboard/pages/space-detail.tsx`

**Update progress message for sector deep dive:**
```typescript
if (selectedAudience === 'sector-deep-dive' && sectorConfig) {
  const sectorName = getSectorName(sectorConfig.sectorId);
  const estimatedMinutes = Math.ceil((briefItems.length * 7) / 60); // 7 sec per item
  const timeEstimate = estimatedMinutes < 7 ? '7-10 minutes' :
                        estimatedMinutes < 15 ? '10-15 minutes' :
                        `${estimatedMinutes} minutes`;

  await updateDoc(spaceRef, {
    summary: `**Analyzing ${briefItems.length} items for ${sectorName} sector**\n\n*Building Bloomberg-style sector analysis...*\n\n⏱️ **Estimated time:** ${timeEstimate}\n\n💡 **Tip:** This report combines your gathered articles with real-time sector data. We'll send you an email when it's ready!`
  });
}
```

#### E. Report Generation Flow

**Update in `space-detail.tsx`:**
```typescript
const handleGenerateReport = async () => {
  // ... existing validation ...

  if (selectedAudience === 'sector-deep-dive') {
    // Show sector config modal first
    setIsSectorConfigModalOpen(true);
    return;
  }

  // ... rest of existing flow ...
};

const handleSectorConfigSubmit = async (sectorConfig: SectorConfig) => {
  setIsSectorConfigModalOpen(false);
  setIsGeneratingSummary(true);

  try {
    // Update progress message
    // ... (see above) ...

    // Call sector deep dive generator
    await generateSectorDeepDive(briefItems, space.id, sectorConfig);

    toast.success('Sector deep dive generation started!');
  } catch (error) {
    console.error('Error generating sector deep dive:', error);
    toast.error('Failed to generate sector deep dive');
    setIsGeneratingSummary(false);
  }
};
```

---

## Deployment Checklist

### Before Deploying:

- [ ] Build TypeScript functions: `cd functions && npm run build`
- [ ] Deploy backend function: `firebase deploy --only functions:generateSectorDeepDive`
- [ ] Build frontend: `npm run build`
- [ ] Deploy frontend: `firebase deploy --only hosting`
- [ ] Test with small dataset (10-20 articles)
- [ ] Test with each sector type
- [ ] Verify email notifications work
- [ ] Check report formatting renders correctly

### Testing Plan:

1. **Mining Sector Test:**
   - Gather 20-30 mining articles
   - Generate report
   - Verify hashrate, energy efficiency metrics present
   - Check company comparison table

2. **Exchanges Sector Test:**
   - Gather 20-30 exchange articles
   - Verify volume, regulatory status metrics
   - Check sentiment analysis

3. **Error Handling Tests:**
   - Test with < 10 articles (should show warning)
   - Test without Perplexity API key (should work with degraded data)
   - Test with invalid sector ID (should show error)

---

## Cost Estimation

**Per Report:**
- Claude Analysis Call: ~$0.30-0.60 (depends on article count)
- Perplexity Searches (5): ~$0.15-0.25
- Claude Report Generation: ~$0.20-0.40
- **Total:** ~$0.65-$1.25 per report

**At Scale:**
- 100 reports/month: ~$65-125
- 500 reports/month: ~$325-625
- 1000 reports/month: ~$650-1,250

---

## Next Steps

1. **Immediate (< 1 hour):**
   - Create sector config modal component
   - Add sector deep dive to template dropdown
   - Wire up backend call in report service

2. **Testing (1-2 hours):**
   - Deploy to Firebase
   - Test with real data for each sector
   - Fix any formatting issues

3. **Polish (30 min):**
   - Add sector icons/badges
   - Improve progress messages
   - Add tooltips explaining KPIs

4. **Documentation (15 min):**
   - Update user docs with sector deep dive guide
   - Add example reports to docs

---

## Success Metrics

Track these after launch:
- [ ] Generation success rate (target: >95%)
- [ ] Average generation time (target: <10 minutes)
- [ ] User satisfaction (survey after use)
- [ ] Report export rate (indicates value)
- [ ] Repeat usage rate (use again within 30 days)

---

## Future Enhancements (Phase 2)

- [ ] Comparative sector analysis (compare 2 sectors side-by-side)
- [ ] Time-series tracking (show deltas vs. previous report)
- [ ] Custom KPI builder UI
- [ ] Export to Bloomberg terminal format
- [ ] API access for programmatic reports
- [ ] Sector alerts ("notify when sentiment drops")

---

**Status:** Ready for frontend integration and testing! 🚀

All backend infrastructure is complete and follows the template quality standards. The Sector Deep Dive template will provide institutional-grade sector analysis that combines narrative intelligence from user-gathered articles with real-time sector data from Perplexity searches.
