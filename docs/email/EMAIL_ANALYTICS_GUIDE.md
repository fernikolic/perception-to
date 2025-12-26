# Email Analytics Guide
**How to see who receives emails and when**

---

## 📊 Option 1: Brevo Dashboard (Most Detailed)

Brevo is your email service provider - it has the most complete data.

### Quick Access
🔗 **Direct Link:** https://app.brevo.com/transactional

### What You Can See
- ✅ Every email sent (recipient, subject, date/time)
- ✅ Delivery status (delivered, bounced, failed)
- ✅ Opens (who opened, when)
- ✅ Clicks (which links clicked)
- ✅ Bounce reasons
- ✅ Spam complaints

### Step-by-Step Navigation

#### 1. View Recent Emails Sent
1. Go to https://app.brevo.com/
2. Login with your Brevo credentials
3. Click **"Campaigns"** (left sidebar)
4. Click **"Transactional"** tab
5. You'll see a table with all emails:
   ```
   Recipient           | Subject                      | Status      | Date
   ---------------------|------------------------------|-------------|-------------
   user@example.com    | Your intelligence companion  | Delivered   | Nov 2, 2025
   test@test.com       | Your companion found...      | Opened      | Nov 1, 2025
   ```

#### 2. Filter Emails
- **By Date:** Select date range (Last 7 days, 30 days, custom)
- **By Sender:** Filter to `notifications@perception.to`
- **By Status:** Show only delivered, bounced, etc.
- **By Recipient:** Search for specific email

#### 3. View Statistics & Trends
1. Click **"Statistics"** (left sidebar)
2. Click **"Transactional"** tab
3. See graphs and metrics:
   - Total sent
   - Delivery rate (%)
   - Open rate (%)
   - Click rate (%)
   - Bounce rate (%)

#### 4. Real-Time Monitoring
1. Click **"Real-time"** (left sidebar)
2. See emails as they send live

#### 5. Export Data
1. Go to Campaigns → Transactional
2. Click **"Export"** button (top right)
3. Select date range
4. Download CSV with all data

---

## 🖥️ Option 2: Your Admin Dashboard (Quick Overview)

I just added an **Email Analytics** page to your admin panel!

### How to Access
1. Go to your app: https://app.perception.to
2. Navigate to `/admin` (click Admin in sidebar)
3. Click **"Email Analytics"** in the left sidebar (under User Management)

**Direct Link:** https://app.perception.to/admin/email-analytics

### What You Can See
- 📊 Summary metrics (last 7/30 days)
  - Total emails sent
  - Delivery rate
  - Open rate
  - Click rate
- 📧 Emails grouped by subject
  - How many of each type sent
  - Who received them
  - Last sent date
- 👥 Recipient details
  - Each user's email
  - How many emails they received
  - Which subjects
  - Open/click counts
- 📨 Recent email activity
- 🔑 Brevo account info

### Filter Options
- Switch between 7 days / 30 days timeframe
- Refresh button to get latest data

---

## 📋 What Data Shows Where

| Information | Brevo | Admin Dashboard |
|-------------|-------|-----------------|
| Individual email sends | ✅ Full detail | ✅ Summary |
| Recipient list | ✅ | ✅ |
| Email subjects | ✅ | ✅ |
| Delivery status | ✅ Yes | ✅ Rate only |
| Open tracking | ✅ Per email | ✅ Count only |
| Click tracking | ✅ Per link | ✅ Count only |
| Bounce reasons | ✅ Yes | ❌ No |
| Spam complaints | ✅ Yes | ❌ No |
| Real-time | ✅ Yes | ❌ No |
| Export CSV | ✅ Yes | ❌ No |
| Sender breakdown | ✅ Yes | ✅ Yes |
| Date range | ✅ Any | ✅ 7/30 days |

---

## 🔍 Common Questions

### "How do I see if a specific user got their welcome email?"

**Brevo:**
1. Go to https://app.brevo.com/transactional
2. In the search box, type the user's email
3. You'll see all emails sent to them
4. Look for subject: "Your intelligence companion is ready"

**Admin Dashboard:**
1. Go to `/admin/email-analytics`
2. Scroll to "Recipient Details" section
3. Find the user's email in the list
4. See how many emails they received

### "How many people received emails today?"

**Brevo:**
1. Go to Statistics → Transactional
2. Set date range to "Today"
3. See "Total sent" number

**Admin Dashboard:**
1. Go to `/admin/email-analytics`
2. Select "7 days"
3. See "Total Sent" in summary card
4. (Note: This is last 7 days, not just today)

### "What's the open rate for welcome emails?"

**Brevo:**
1. Go to Campaigns → Transactional
2. Filter by subject: "Your intelligence companion is ready"
3. See open rate %

**Admin Dashboard:**
1. Go to `/admin/email-analytics`
2. Scroll to "Emails by Subject"
3. Find "Your intelligence companion is ready"
4. See count and recipients

### "Are emails being delivered successfully?"

**Brevo:**
1. Go to Statistics → Transactional
2. Check "Delivery Rate" - should be 95%+
3. Check "Bounce Rate" - should be <2%

**Admin Dashboard:**
1. Go to `/admin/email-analytics`
2. See "Delivery Rate" in summary
3. Should show 100% if all delivered

---

## 🎯 Best Practices

### Daily Monitoring
- Check Brevo dashboard once a day
- Look for:
  - Delivery rate dropping
  - Bounce rate increasing
  - Spam complaints

### Weekly Review
- Review `/admin/email-analytics` page
- Check:
  - Total emails sent vs expected
  - Open rates trending
  - Click rates on CTAs

### After Sender Change
After we changed from `fernando@perception.to` to `notifications@perception.to`:
1. Monitor delivery rate closely
2. Check if emails go to spam
3. Verify recipient engagement

---

## 🚨 Red Flags to Watch For

| Metric | Good | Warning | Critical |
|--------|------|---------|----------|
| Delivery Rate | 95-100% | 85-95% | <85% |
| Bounce Rate | <2% | 2-5% | >5% |
| Spam Rate | <0.1% | 0.1-1% | >1% |
| Open Rate | >15% | 10-15% | <10% |
| Click Rate | >2% | 1-2% | <1% |

### If Delivery Rate Drops:
1. Check sender verification in Brevo
2. Look for bounce reasons
3. Check if domain reputation dropped

### If Bounce Rate High:
1. Review email list quality
2. Remove invalid emails
3. Implement email validation on signup

### If Open Rate Low:
1. Check subject lines
2. Test different send times
3. Verify emails not going to spam

---

## 📱 Mobile Access

Both Brevo and your admin dashboard work on mobile:
- Brevo has a mobile app (iOS/Android)
- Your admin dashboard is mobile-responsive

---

## 🔗 Quick Links

**Brevo:**
- Dashboard: https://app.brevo.com/
- Transactional Emails: https://app.brevo.com/transactional
- Statistics: https://app.brevo.com/statistics/transactional
- Real-time: https://app.brevo.com/real-time
- Senders: https://app.brevo.com/settings/senders

**Your App:**
- Admin: https://app.perception.to/admin
- Email Analytics: https://app.perception.to/admin/email-analytics
- Users: https://app.perception.to/admin/users
- Trial Signups: https://app.perception.to/admin/trial-signups

---

## 💡 Pro Tips

1. **Set up Brevo mobile app** for real-time alerts
2. **Bookmark the transactional page** for quick access
3. **Create saved filters** in Brevo for common queries
4. **Export weekly reports** from Brevo for record keeping
5. **Check admin dashboard** for quick overview
6. **Use Brevo** for detailed investigation

---

## 🆘 Troubleshooting

### "I don't see any emails in Brevo"
- Check date range (expand to 30 days)
- Verify you're logged into correct account
- Check if sender filter is applied

### "Email Analytics page shows 0 emails"
- Check if API endpoint is working:
  ```
  https://getemailanalytics-bybdtt43xa-uc.a.run.app?days=7
  ```
- Refresh the page
- Try different timeframe (7 vs 30 days)

### "Delivery rate is 0%"
- Sender not verified in Brevo
- Brevo API key issue
- Check function logs for errors

---

*Last Updated: November 2, 2025*
*After: Sender email fix deployed*
