# Email Sequence Deployment Guide

## 🎉 Implementation Complete!

Your automated email sequences with Fernando's copywriting have been fully implemented with advanced features including:

## ✅ What's Been Implemented

### 1. **New Email Templates with Fernando's Copy**
- Day 0: Welcome email (sent immediately on signup)
- Day 1: "This will change how you make decisions"
- Day 2: "Why everyone has the data but nobody has the answers"
- Day 3: "It was hiding in plain sight"
- Day 4: "But I already have..."
- Day 5: "Your trial ends in 48 hours"
- Day 6: "Your intelligence report (disappears tomorrow)"
- Day 7: "3 hours left (your call)"

### 2. **Email Triggers for All Signups**
- ✅ Regular email/password signups
- ✅ Google authentication signups
- ✅ Stripe checkout completions (existing)

### 3. **Advanced Email Features**
- ✅ Unsubscribe functionality with branded page
- ✅ Email open/click tracking via Brevo webhooks
- ✅ Email analytics dashboard
- ✅ Scheduled email processing
- ✅ Consistent branding and responsive design

### 4. **User Segmentation**
- **Enterprise**: Longer email delays (1, 3, 5, 7, 10, 12, 14 days)
- **Startup**: Moderate delays (1, 2, 4, 5, 6, 8, 10 days)
- **Crypto Trader**: Fast-paced sequence (1, 2, 3, 4, 6, 7 days)
- **Analyst**: Thoughtful sequence (1, 2, 3, 5, 7, 9, 11 days)
- **Individual**: Standard sequence (1, 2, 3, 4, 5, 6, 7 days)

### 5. **Behavior-Based Triggers**
- First login email
- Opportunity viewing milestones
- First brief creation
- Inactive user re-engagement (7+ days)
- Feature usage acknowledgments

### 6. **Analytics & Tracking**
- Email events (sent, opened, clicked, unsubscribed)
- Behavior event tracking
- Segmentation analytics
- Performance dashboards

## 🚀 Deployment Steps

### Step 1: Build and Deploy Functions
```bash
cd functions
npm run build
firebase deploy --only functions
```

### Step 2: Set Up Brevo Webhooks
1. Go to Brevo dashboard → Transactional → Settings → Webhooks
2. Add webhook URL: `https://your-project.cloudfunctions.net/brevoWebhook`
3. Enable events: `delivered`, `opened`, `click`, `unsubscribed`

### Step 3: Configure Scheduled Email Processing
The `processEmails` function runs every hour automatically. No additional setup required.

### Step 4: Test the Implementation
```bash
# Test basic functionality
node test-email-sequence.js 1

# Test segmentation
node test-email-sequence.js 2
```

### Step 5: Monitor and Optimize
Access analytics at: `https://your-project.cloudfunctions.net/getEmailAnalytics`

## 📧 Email Flow Overview

```
User Signs Up
     ↓
Auto-detect Segment (crypto_trader, enterprise, startup, analyst, individual)
     ↓
Send Day 0 Welcome Email (immediate)
     ↓
Schedule Segmented Email Sequence
     ↓
Process Scheduled Emails (hourly)
     ↓
Track Events → Analytics Dashboard
```

## 🛠 API Endpoints

### Core Functions
- `triggerEmailSequence` - Start email sequence for new users
- `processEmails` - Process scheduled emails (runs automatically)
- `handleUnsubscribe` - Handle unsubscribe requests

### Analytics & Tracking
- `getEmailAnalytics` - Get email performance metrics
- `brevoWebhook` - Handle Brevo email events
- `trackEmailClick` - Track email clicks with redirects

### Behavior Triggers
- `triggerBehaviorEmail` - Send behavior-based emails
- `getBehaviorAnalytics` - Get behavior analytics

## 🎯 User Segments

The system auto-detects user segments based on:
- **Email domain** (corporate vs personal)
- **Keywords** in email/name (crypto, analyst, research terms)
- **Signup source** (referral suggests startup)

You can override by passing `segment` parameter in the trigger.

## 📊 Tracking & Analytics

### Email Events Tracked
- `sent` - Email delivered successfully
- `opened` - User opened the email
- `clicked` - User clicked a link
- `unsubscribed` - User unsubscribed

### Behavior Events Tracked
- `first_login` - User's first login
- `opportunity_viewed` - Opportunity milestones
- `brief_created` - First brief creation
- `inactive_7_days` - User inactive for 7+ days
- `feature_used` - Specific feature usage

## 🔧 Configuration Options

### Environment Variables Required
```bash
BREVO_API_KEY=your_brevo_api_key
```

### Customization Options
1. **Email Timing**: Modify delays in `getSegmentedEmailSequence()`
2. **Segments**: Add new segments in `detectUserSegment()`
3. **Templates**: Update email content in individual email functions
4. **Triggers**: Add new behavior triggers in `behavior-triggers.ts`

## 🚨 Important Notes

### Sender Configuration
All emails now send from: `fernando@perception.to` (Fernando from Perception)

### Unsubscribe Compliance
- Every email includes unsubscribe link
- Unsubscribe immediately stops all marketing emails
- Branded unsubscribe page maintains user experience

### Rate Limits
- Brevo free tier: 300 emails/day
- Upgrade to higher tier for production volume

## 📈 Expected Performance

Based on industry benchmarks with your high-quality copy:
- **Open Rate**: 25-35% (vs industry avg 20%)
- **Click Rate**: 3-7% (vs industry avg 2.5%)
- **Unsubscribe Rate**: <1% (vs industry avg 2%)
- **Conversion Rate**: 8-15% trial-to-paid

## 🔍 Monitoring

### Key Metrics to Watch
1. **Email Deliverability** (should be >95%)
2. **Open Rates** by segment
3. **Click-through rates** by email type
4. **Conversion rates** trial-to-paid
5. **Unsubscribe rates** (keep under 1%)

### Dashboard Access
- Email Analytics: `/getEmailAnalytics?timeframe=30`
- Behavior Analytics: `/getBehaviorAnalytics?timeframe=30`
- Unsubscribe Stats: `/getUnsubscribeStats`

## 🎯 Next Steps

1. **Deploy and Test**: Run the deployment steps above
2. **Monitor Performance**: Check analytics weekly
3. **A/B Testing**: Test different subject lines
4. **Segment Optimization**: Refine segments based on data
5. **Content Updates**: Regularly refresh email copy based on results

## 🆘 Troubleshooting

### Common Issues
- **Emails not sending**: Check BREVO_API_KEY configuration
- **Tracking not working**: Verify webhook URL in Brevo
- **Segmentation issues**: Review auto-detection logic
- **Duplicates**: Check sequence deduplication logic

### Debug Commands
```bash
# Check function logs
firebase functions:log --limit 50

# Test specific email
curl -X POST "your-endpoint/triggerEmailSequence" \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","email":"test@example.com","name":"Test"}'
```

---

**Your automated email sequences are now ready to drive conversions with Fernando's compelling copy! 🚀**