# Market Sentiment Index - Visual Comparison Guide

## Quick Visual Reference

### Formula Comparison

```
┌─────────────────────────────────────────────────────────────┐
│ STANDARD (Current - Linear)                                 │
├─────────────────────────────────────────────────────────────┤
│ Index = (posRatio - negRatio + 1) × 50                     │
│                                                             │
│     100 ┤                                            ●      │
│      90 ┤                                       ●           │
│      80 ┤                                  ●                │
│      70 ┤                             ●                     │
│      60 ┤                        ●                          │
│      50 ┤                   ●                               │
│      40 ┤              ●                                    │
│      30 ┤         ●                                         │
│      20 ┤    ●                                              │
│      10 ┤●                                                  │
│       0 ┤                                                   │
│         └────────────────────────────────────────          │
│          0%  20%  40%  60%  80% 100%                        │
│               Positive Articles (%)                         │
│                                                             │
│ ✓ Predictable   ✓ Symmetric   ✓ Simple                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ NON-LINEAR (Optional - Sigmoid)                             │
├─────────────────────────────────────────────────────────────┤
│ Index = sigmoid((posRatio - negRatio) × 3) × 100           │
│                                                             │
│     100 ┤                                              ●    │
│      90 ┤                                          ●        │
│      80 ┤                                     ●             │
│      70 ┤                              ●                    │
│      60 ┤                         ●                         │
│      50 ┤                   ●                               │
│      40 ┤              ●                                    │
│      30 ┤         ●                                         │
│      20 ┤     ●                                             │
│      10 ┤  ●                                                │
│       0 ┤●                                                  │
│         └────────────────────────────────────────          │
│          0%  20%  40%  60%  80% 100%                        │
│               Positive Articles (%)                         │
│                                                             │
│ ✓ Reduces extremes   ✓ Less noise   ✗ Complex             │
└─────────────────────────────────────────────────────────────┘
```

## Sentiment Distribution Examples

### Example 1: Strong Greed (80% Positive)

```
Articles: 80 Positive, 10 Neutral, 10 Negative (Total: 100)

┌─────────────────────────────────────────────┐
│ ████████████████████ 80% Positive           │
│ ██ 10% Neutral                              │
│ ██ 10% Negative                             │
└─────────────────────────────────────────────┘

Standard Index:     85  (Extreme Greed)
Non-Linear Index:   90  (Extreme Greed)
Confidence:         86% ✓ High volume

→ Both methods agree: Strong positive sentiment
```

### Example 2: Moderate Greed (60% Positive)

```
Articles: 60 Positive, 20 Neutral, 20 Negative (Total: 100)

┌─────────────────────────────────────────────┐
│ ███████████████ 60% Positive                │
│ █████ 20% Neutral                           │
│ █████ 20% Negative                          │
└─────────────────────────────────────────────┘

Standard Index:     70  (Greed)
Non-Linear Index:   65  (Greed)
Confidence:         86% ✓ High volume

→ Non-linear is more conservative at moderate levels
```

### Example 3: Balanced Sentiment

```
Articles: 40 Positive, 20 Neutral, 40 Negative (Total: 100)

┌─────────────────────────────────────────────┐
│ ██████████ 40% Positive                     │
│ █████ 20% Neutral                           │
│ ██████████ 40% Negative                     │
└─────────────────────────────────────────────┘

Standard Index:     50  (Neutral)
Non-Linear Index:   50  (Neutral)
Confidence:         86% ✓ High volume

→ Both methods agree at neutral point
```

### Example 4: High Neutral Coverage

```
Articles: 25 Positive, 50 Neutral, 25 Negative (Total: 100)

┌─────────────────────────────────────────────┐
│ ██████ 25% Positive                         │
│ ████████████ 50% Neutral                    │
│ ██████ 25% Negative                         │
└─────────────────────────────────────────────┘

Standard Index:         50  (Neutral)
Weighted (fear):        35  (Fear) ← Neutral = uncertainty
Weighted (optimism):    65  (Greed) ← Neutral = balance
Confidence:             86% ✓ High volume

→ High neutral coverage dampens the index toward 50
```

### Example 5: Low Volume Day

```
Articles: 6 Positive, 2 Neutral, 2 Negative (Total: 10)

┌─────────────────────────────────────────────┐
│ ███████████████ 60% Positive                │
│ █████ 20% Neutral                           │
│ █████ 20% Negative                          │
└─────────────────────────────────────────────┘

Standard Index:     70  (Greed)
Non-Linear Index:   65  (Greed)
Confidence:         18% ⚠️ Low volume

95% Confidence Interval: [48, 92]
Margin of Error: ±22 points

→ Same sentiment ratio, but LOW CONFIDENCE
→ Could easily be noise, not real trend
```

## Confidence Score Visualization

```
Volume vs Confidence (Exponential Decay)

100% ┤                                    ████████████████
 90% ┤                            ████████
 80% ┤                       █████
 70% ┤                    ███
 60% ┤                 ███
 50% ┤               ██
 40% ┤            ███
 30% ┤          ██
 20% ┤        ██
 10% ┤      ██
  0% ┤██████
     └─────────────────────────────────────────────────────
      0    25   50   75  100  125  150  175  200  225  250
                     Article Volume

Key Thresholds:
• 50 articles  → 63% confidence  (baseline)
• 100 articles → 86% confidence  (reliable)
• 200 articles → 98% confidence  (very reliable)
```

## Real-World Scenario Comparison

### Scenario: Bitcoin Price Surge

```
Day 1: Price +15%
──────────────────────────────────────────────────────
Mainstream Media (150 articles):
  120 Positive (80%), 15 Neutral (10%), 15 Negative (10%)

  Standard Index:     85  (Extreme Greed)
  Confidence:         95% ✓✓ Very High

  → Strong signal, high confidence
  → Reliable extreme sentiment reading

──────────────────────────────────────────────────────
Crypto-Only Outlets (20 articles):
  16 Positive (80%), 2 Neutral (10%), 2 Negative (10%)

  Standard Index:     85  (Extreme Greed)
  Confidence:         33% ⚠️ Low

  95% CI: [66, 100+]

  → Same ratio, different confidence
  → Could be sampling noise
  → Wait for more data before reacting
```

## When to Use Each Method

### Standard Linear (Current)
```
✓ General-purpose daily index
✓ User-facing display
✓ Historical comparisons
✓ Simple explanations

Use when: Showing to users, general monitoring
```

### Non-Linear Sigmoid
```
✓ Extreme sentiment detection
✓ Automated alerts (reduce false alarms)
✓ Power user features
✗ Harder to explain

Use when: Detecting genuine extremes, alert systems
```

### Volume-Weighted Average
```
✓ Multi-day summaries
✓ Weekly/monthly trends
✓ Comparing periods with different volumes
✗ Single-day analysis

Use when: Calculating week/month averages
```

### Statistical Bounds
```
✓ Low-volume periods
✓ Uncertainty visualization
✓ Alert thresholds
✗ High-volume days (bounds too narrow to matter)

Use when: Volume < 50 articles/day
```

## UI Display Recommendations

### Homepage Display

```
┌────────────────────────────────────────┐
│  Market Sentiment                      │
│                                        │
│  68  (Greed) ▲ +3.5                   │
│  ●────────────────────────────●────────│
│  Fear              50             Greed│
│                                        │
│  Based on 145 articles ✓ (86% conf.)  │
└────────────────────────────────────────┘

✓ Clear value
✓ Visual indicator
✓ Change from yesterday
✓ Confidence note (subtle)
```

### Low Confidence Warning

```
┌────────────────────────────────────────┐
│  Market Sentiment                      │
│                                        │
│  72  (Greed) ▲ +8.0                   │
│  ●────────────────────────────●────────│
│  Fear              50             Greed│
│                                        │
│  ⚠️ Based on only 12 articles (18%)   │
│  Confidence may be low                 │
└────────────────────────────────────────┘

⚠️ Show warning icon
⚠️ Explain low confidence
⚠️ Suggest interpreting cautiously
```

### Detailed View (Tooltip/Modal)

```
┌────────────────────────────────────────┐
│  Market Sentiment Details              │
├────────────────────────────────────────┤
│  Index: 68 (Greed)                     │
│  Change: ▲ +3.5 from yesterday         │
│  Confidence: 86% (145 articles)        │
│                                        │
│  Sentiment Breakdown:                  │
│  ████████████████ 60% Positive (87)   │
│  █████ 20% Neutral (29)               │
│  █████ 20% Negative (29)              │
│                                        │
│  Calculation:                          │
│  (60% - 20% + 1) × 50 = 68            │
└────────────────────────────────────────┘
```

## Alert Thresholds

### Conservative (Reduce False Alarms)

```
Extreme Fear:   Index ≤ 20  AND  Confidence > 70%
Extreme Greed:  Index ≥ 80  AND  Confidence > 70%

→ Requires both extreme index AND high confidence
→ Prevents alerts on low-volume noise
```

### Standard (Current)

```
Extreme Fear:   Index ≤ 25
Extreme Greed:  Index ≥ 75

→ Simple threshold
→ May alert on low-confidence days
```

### Statistical (Most Robust)

```
Extreme Fear:   Index ≤ 25  AND
                upperBound < 30  AND
                Confidence > 50%

→ Index is extreme
→ Uncertainty still keeps it extreme
→ Reasonable sample size
```

## Testing Different Formulas

To test alternative formulas:

```bash
cd functions
npx ts-node src/utils/sentiment-calculations.test.ts
```

This will output comprehensive comparisons showing:
- How each formula handles different scenarios
- Impact of volume on confidence
- Statistical significance testing
- Recommendations

---

**Quick Reference**: Use this guide to understand how different scenarios affect the sentiment index and when to use each calculation method.
