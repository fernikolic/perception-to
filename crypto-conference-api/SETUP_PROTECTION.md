# 🛡️ Repository Protection Setup Guide

Follow these steps to secure your repository before making it public:

## Step 1: Add Your API Key (BEFORE going public)
1. Go to: Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `PERPLEXITY_API_KEY`
4. Value: Your API key
5. Click "Add secret"

## Step 2: Enable Branch Protection Rules
1. Go to: Settings → Branches
2. Click "Add rule"
3. Branch name pattern: `main`
4. Enable these protections:
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals: 1
     - ✅ Dismiss stale pull request approvals when new commits are pushed
     - ✅ Require review from CODEOWNERS
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Include administrators** (enforce for admins too)
   - ✅ **Restrict who can push to matching branches**
     - Add yourself as the only allowed user
5. Click "Create"

## Step 3: Make Repository Public
1. Go to: Settings → General
2. Scroll to "Danger Zone"
3. Click "Change visibility"
4. Select "Public"
5. Type repository name to confirm

## Step 4: Enable GitHub Pages
1. Go to: Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Click Save

## Step 5: Configure Additional Security
1. Go to: Settings → Security
2. Enable:
   - ✅ Dependency graph
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates
   - ✅ Secret scanning

## Step 6: Set Interaction Limits (Optional)
1. Go to: Settings → Moderation → Interaction limits
2. Choose temporary interaction limits if you notice abuse
3. Options:
   - Limit to existing users
   - Limit to prior contributors
   - Limit to collaborators only

## 🔒 What This Protects Against:

### ✅ Protected:
- Your API key (stored in secrets, never exposed)
- Direct pushes to main branch (requires PR)
- Malicious code changes (requires your review)
- Workflow abuse (only you can manually trigger)
- Excessive API usage (weekly schedule only)

### ⚠️ Still Public:
- Your code (intentionally open source)
- The dashboard (publicly accessible)
- JSON API endpoint (read-only)
- Fork ability (but forks use their own resources)

## 📊 Monitor Usage:
1. **GitHub Actions**: Settings → Actions → Usage
2. **API calls**: Check Perplexity dashboard
3. **Traffic**: Insights → Traffic
4. **Security alerts**: Security tab

## 🚨 If You Notice Abuse:
1. **Immediate**: Enable interaction limits
2. **Review**: Check recent PRs and issues
3. **Block**: Block abusive users
4. **Report**: Report to GitHub if severe

## ✅ Security Checklist:
- [ ] API key added to secrets
- [ ] Branch protection enabled
- [ ] CODEOWNERS file active
- [ ] Dependabot enabled
- [ ] Secret scanning enabled
- [ ] Workflow permissions restricted
- [ ] Repository made public
- [ ] GitHub Pages enabled

## 💡 Tips:
- Review all PRs carefully before merging
- Never commit API keys or secrets
- Monitor Actions usage weekly
- Keep dependencies updated
- Document any security incidents

---

Once you've completed these steps, your repository will be secure and ready for public use!