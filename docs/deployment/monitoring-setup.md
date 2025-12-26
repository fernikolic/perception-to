# 🚨 Complete Monitoring & Alert Setup Guide

## Overview

Your app now has a comprehensive monitoring system that will notify you when **ANYTHING** goes wrong. Here's what it monitors and how to set it up.

---

## 🔍 **What Gets Monitored**

### **1. Frontend Errors**
- JavaScript errors and crashes
- Unhandled promise rejections
- React component errors
- Memory leaks and high usage

### **2. Performance Issues**
- Slow page loads (>4 seconds)
- Poor Core Web Vitals (LCP, FID, CLS)
- Slow API responses (>5 seconds)
- Memory usage spikes (>90%)

### **3. API & Network Issues**
- API endpoint failures (4xx, 5xx errors)
- Network connectivity problems
- Firebase connection issues
- Third-party service outages

### **4. Security Issues**
- Content Security Policy violations
- Suspicious user activity (bot detection)
- Authentication failures
- Potential security breaches

### **5. Business Metrics**
- Payment failures (Stripe issues)
- User activity drops (low engagement)
- Feature usage problems
- Revenue-impacting issues

### **6. Infrastructure Issues**
- Server health problems
- CDN/asset loading failures
- Database connectivity issues
- Scheduled job failures

---

## 📧 **Notification Channels**

The system supports multiple notification methods:

### **Email** (Already configured)
- ✅ Configured for: `fernikolic@gmail.com`
- Rich HTML emails with severity colors
- Automatic rate limiting to prevent spam

### **Discord** (Optional)
```typescript
// Add to alert-system.ts config
discord: 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL'
```

### **Slack** (Optional)
```typescript
// Add to alert-system.ts config
slack: 'https://hooks.slack.com/services/YOUR_WEBHOOK_URL'
```

### **Telegram** (Optional)
```typescript
// Add to alert-system.ts config
telegram: 'BOT_TOKEN:CHAT_ID'
```

---

## ⚙️ **Setup Instructions**

### **Step 1: Deploy Backend Functions**

```bash
# Add alerts function to your Firebase Functions
cd functions
npm run deploy
```

The functions include:
- `sendAlertEmail` - Sends formatted email alerts
- `healthMonitor` - Checks system health every 5 minutes
- `businessMetricsMonitor` - Monitors business metrics hourly

### **Step 2: Configure Brevo (Email)** ✅ ALREADY DONE

Your system is already configured with Brevo! The alert system will use your existing:
- ✅ Brevo API integration in `functions/src/utils/email.ts`
- ✅ Environment variable `BREVO_API_KEY`
- ✅ Sender address: `alerts@perception.to`

No additional email setup required - alerts will be sent via your existing Brevo account.

### **Step 3: Configure Additional Channels (Optional)**

#### Discord Setup:
1. Go to your Discord server settings
2. Create a webhook in your desired channel
3. Copy the webhook URL
4. Update `alert-system.ts` with the URL

#### Slack Setup:
1. Create a Slack app at [api.slack.com](https://api.slack.com)
2. Add incoming webhook integration
3. Copy the webhook URL
4. Update `alert-system.ts` with the URL

#### Telegram Setup:
1. Create a bot with [@BotFather](https://t.me/botfather)
2. Get your chat ID by messaging [@userinfobot](https://t.me/userinfobot)
3. Format as `BOT_TOKEN:CHAT_ID`
4. Update `alert-system.ts` with the string

### **Step 4: Test the System**

I've created a comprehensive test script for you:

#### **Quick Test (Browser Console)**
```javascript
// Test in browser console
import { alertSystem } from '@/lib/monitoring/alert-system';

alertSystem.sendAlert({
  severity: 'medium',
  title: 'Test Alert',
  message: 'This is a test to verify Brevo monitoring works',
  category: 'infrastructure'
});
```

#### **Complete Test Script**
Run the test script I created:
```bash
# In your app, run this in the browser console
node test-alert-system.js
```

Or load `test-alert-system.js` in your browser to test both frontend and backend alerts.

---

## 🎯 **Alert Severity Levels**

### **Critical** 🚨 (Immediate notification)
- Payment system failures
- Complete app crashes
- Security breaches
- Infrastructure outages

### **High** 🧡 (Within 1 minute)
- JavaScript errors
- API failures
- Authentication issues
- Performance degradation

### **Medium** 💛 (Within 3 minutes)
- Slow performance
- Feature usage drops
- Minor API issues
- Suspicious activity

### **Low** 💚 (Within 5 minutes)
- Warning conditions
- Non-critical issues
- Informational alerts

---

## 📊 **Monitoring Dashboard**

### **View Alerts History**
Check Firestore collections:
- `alerts` - Sent alerts log
- `alert_errors` - Failed alert attempts
- `analytics_events` - All monitoring events

### **Current Health Status**
```javascript
// Check system health in console
console.log('Performance:', performance.memory);
console.log('Network:', navigator.onLine);
console.log('Errors:', window.__errorCount || 0);
```

---

## 🔧 **Customization**

### **Adjust Alert Thresholds**

Edit `alert-system.ts` to customize when alerts fire:

```typescript
// Performance thresholds
if (entry.startTime > 4000) { // Change from 4000ms to your preference

// Memory usage threshold
if (usagePercent > 90) { // Change from 90% to your preference

// API response time threshold
if (duration > 5000) { // Change from 5000ms to your preference
```

### **Add Custom Alerts**

```typescript
// In any component
import { useAlertSystem } from '@/lib/monitoring/alert-system';

const { sendAlert } = useAlertSystem();

// Custom business logic alert
if (criticalCondition) {
  sendAlert({
    severity: 'high',
    title: 'Custom Business Alert',
    message: 'Your custom condition was met',
    category: 'business'
  });
}
```

### **Monitor Custom Metrics**

```typescript
// Track custom events
alertSystem.sendAlert({
  severity: 'low',
  title: 'User Action',
  message: 'User completed important action',
  category: 'business',
  metadata: { userId: 'user123', action: 'subscription' }
});
```

---

## 📱 **Mobile Notifications**

For mobile alerts, consider adding:

### **Push Notifications**
- Firebase Cloud Messaging (FCM)
- Push to your phone when critical alerts occur

### **SMS Alerts**
- Twilio integration for critical alerts
- Phone calls for infrastructure outages

---

## 🎉 **You're All Set!**

Your monitoring system will now:

✅ **Automatically detect** any issues
✅ **Send immediate notifications** via email
✅ **Rate limit** to prevent spam
✅ **Track alert history** in Firestore
✅ **Monitor business metrics** continuously
✅ **Check system health** every 5 minutes

**You'll know about problems before your users do!**

---

## 🆘 **Emergency Contacts**

If the monitoring system itself fails:

1. **Check Firebase Console** for function errors
2. **Check SendGrid Dashboard** for email delivery
3. **Manual health check** at [app.perception.to](https://app.perception.to)
4. **Backup monitoring** via Google Cloud Monitoring

---

*Last updated: 2025-01-27*