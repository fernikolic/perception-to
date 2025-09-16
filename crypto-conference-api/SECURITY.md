# Security Policy

## 🔒 Repository Security Measures

This repository implements multiple security layers to prevent abuse:

### 1. GitHub Actions Security
- **Owner-only manual triggers**: Only the repository owner can manually trigger workflows
- **Restricted permissions**: Workflows have minimal required permissions
- **Required input logging**: Manual triggers require a reason to be documented
- **Schedule-only updates**: Primary updates run on a fixed schedule (weekly)

### 2. API Key Protection
- **Secret storage**: Perplexity API key stored in GitHub Secrets (never exposed)
- **No client-side API calls**: All API calls happen server-side in GitHub Actions
- **Rate limiting**: Weekly schedule prevents API abuse

### 3. Branch Protection (Recommended Settings)
To enable these protections:
1. Go to Settings → Branches
2. Add rule for `main` branch:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1)
   - ✅ Dismiss stale pull request approvals
   - ✅ Require review from CODEOWNERS
   - ✅ Require status checks to pass
   - ✅ Include administrators

### 4. Fork Security
- Forks do NOT have access to your secrets
- Forks cannot trigger workflows on your repository
- GitHub Pages from forks use their own domain

## 🚫 Abuse Prevention

### What others CANNOT do:
- ❌ Access your Perplexity API key
- ❌ Trigger excessive API calls
- ❌ Modify your production data without approval
- ❌ Run workflows using your resources
- ❌ Push directly to main branch (with protection enabled)

### What others CAN do:
- ✅ Fork the repository (using their own API keys)
- ✅ Submit pull requests (require your approval)
- ✅ View the public dashboard
- ✅ Access the JSON API endpoint

## 📊 Cost Control

- **API calls**: Maximum 52 per year (weekly schedule)
- **Manual triggers**: Limited to repository owner
- **GitHub Actions**: Free tier includes 2,000 minutes/month
- **Estimated cost**: $5-15/month for Perplexity API only

## 🐛 Reporting Security Issues

If you discover a security vulnerability:
1. **DO NOT** create a public issue
2. Email: [your-email@example.com]
3. Include: Description, steps to reproduce, potential impact

## 📝 Usage Guidelines

### Acceptable Use:
- Educational purposes
- Integration into other projects (with attribution)
- Personal conference tracking
- API consumption (reasonable rate limits)

### Unacceptable Use:
- Attempting to access private keys/secrets
- Excessive API requests or scraping
- Submitting malicious pull requests
- Using the service for spam or illegal activities

## 🔧 Security Checklist for Repository Owner

- [ ] Enable branch protection rules
- [ ] Set up CODEOWNERS file
- [ ] Add Perplexity API key to secrets
- [ ] Review workflow permissions
- [ ] Enable Dependabot alerts
- [ ] Set up secret scanning
- [ ] Review and approve all pull requests
- [ ] Monitor Actions usage

## 📅 Regular Security Reviews

Perform monthly:
- Check GitHub Actions usage/costs
- Review recent pull requests
- Verify no unauthorized changes
- Update dependencies if needed
- Monitor Perplexity API usage

## 🤝 Responsible Disclosure

We appreciate security researchers who:
- Report issues privately first
- Allow reasonable time for fixes
- Don't exploit vulnerabilities
- Help improve our security

---

Last updated: 2025