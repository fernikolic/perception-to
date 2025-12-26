# Staging Environment Setup

**Last Updated:** 2025-11-02

This document describes the staging environment configuration for Perception, including the setup process, architecture, and deployment workflow.

## Overview

The staging environment provides a pre-production testing environment that mirrors production configuration but uses a separate deployment URL. This allows for testing changes before they reach end users.

### Environment URLs

| Environment | URL | Branch | Purpose |
|-------------|-----|--------|---------|
| **Production** | https://app.perception.to | `main` | Live production site |
| **Staging** | https://staging.perception-app.pages.dev | `staging` | Pre-production testing |
| **Local** | http://localhost:5173 | any | Local development |

## Architecture

### Frontend Deployment
- **Platform:** Cloudflare Pages
- **Repository:** fernikolic/perception-app (GitHub)
- **Auto-deploy:** Enabled for both branches
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Backend Services
- **Firebase Functions:** Shared across all environments
- **Cloud Run Services:** Shared across all environments
- **BigQuery:** Shared data warehouse
- **Firestore:** Shared database

**Important:** Backend services are shared between staging and production. The only difference is CORS configuration that whitelists both staging and production frontend URLs.

## Initial Setup (Completed 2025-11-02)

### 1. Branch Creation
The `staging` branch was created from `main` to serve as the pre-production branch:

```bash
git checkout -b staging
git push origin staging
```

### 2. Environment Variables Configuration

Environment variables were configured for preview deployments (staging branch) via Cloudflare API:

**Method:** Direct API call using OAuth token
**File:** `/tmp/cf-env.json`

**Variables Configured:**
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
- `VITE_API_BASE_URL`
- `VITE_API_BASE_URL_V2`
- `VITE_TRENDS_API_URL`
- `VITE_FIREBASE_FUNCTIONS_URL`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_APP_URL`
- `VITE_APP_HOME_URL`
- `VITE_APP_AUTH_URL`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_FEEDBACK_EMAIL`
- `VITE_ENABLE_LOGS`

**API Endpoint Used:**
```bash
curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/pages/projects/perception-app" \
  -H "Authorization: Bearer {TOKEN}" \
  -H "Content-Type: application/json" \
  -d @/tmp/cf-env.json
```

### 3. CORS Configuration

To allow staging frontend to communicate with backend services, the staging URL was added to the CORS whitelist.

**File:** `functions/src/config/cors.ts`

**Change:**
```typescript
const ALLOWED_ORIGINS = [
  'https://app.perception.to',
  'https://perception.to',
  'https://www.perception.to',
  'https://perception-app-3db34.web.app',
  'https://perception-app-3db34.firebaseapp.com',
  // Staging domain
  'https://staging.perception-app.pages.dev',  // ← Added
  // Development origins
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];
```

**Deployment:**
```bash
# Build functions
cd functions && npm run build

# Deploy only affected functions
firebase deploy --only functions:bigquerySearch,functions:hybridFeed
```

**Commit Reference:** `07e4ec7` - "fix: Add staging domain to CORS whitelist"

## Deployment Workflow

### Deploying to Staging

1. **Make changes on staging branch:**
   ```bash
   git checkout staging
   # Make your changes
   git add .
   git commit -m "feat: Your feature description"
   ```

2. **Push to staging:**
   ```bash
   git push origin staging
   ```

3. **Automatic deployment:**
   - Cloudflare Pages automatically detects the push
   - Builds the application
   - Deploys to https://staging.perception-app.pages.dev
   - Deployment takes ~3-5 minutes

4. **Test on staging URL:**
   - Verify all features work correctly
   - Check for errors in browser console
   - Test API interactions

### Deploying to Production

**Only after testing on staging:**

1. **Merge staging to main:**
   ```bash
   git checkout main
   git merge staging
   ```

2. **Push to production:**
   ```bash
   git push origin main
   ```

3. **Automatic deployment:**
   - Cloudflare Pages automatically deploys to production
   - Live at https://app.perception.to

## Best Practices

### ✅ DO:
- Always test changes on staging first
- Wait for staging deployment to complete before testing
- Check browser console for errors on staging
- Test all user flows that your changes affect
- Only merge to main after confirming staging works

### ❌ DON'T:
- Don't push directly to main without testing on staging
- Don't merge staging to main without explicit confirmation
- Don't skip testing API interactions on staging
- Don't assume staging works just because local works

## Monitoring and Debugging

### Check Deployment Status

**Cloudflare Dashboard:**
https://dash.cloudflare.com/565edbf71e00f27e7dc764574a32e04e/pages/view/perception-app

### View Deployment Logs

**Via Cloudflare CLI:**
```bash
npx wrangler pages deployment list --project-name=perception-app
```

### Common Issues

#### 1. CORS Errors on Staging

**Symptom:**
```
Access to fetch at 'https://us-central1-perception-app-3db34.cloudfunctions.net/...'
from origin 'https://staging.perception-app.pages.dev' has been blocked by CORS policy
```

**Solution:**
- Verify staging URL is in CORS whitelist (`functions/src/config/cors.ts`)
- Redeploy Firebase Functions after updating CORS config
- Clear browser cache and reload

#### 2. Environment Variables Not Working

**Symptom:**
```
FirebaseError: Firebase: Error (auth/invalid-api-key)
```

**Solution:**
- Check env vars in Cloudflare dashboard
- Trigger fresh deployment (push a small change)
- Verify env vars start with `VITE_` prefix

#### 3. Deployment Stuck or Failed

**Check build logs in Cloudflare dashboard:**
1. Go to Deployments tab
2. Click on the failed deployment
3. Review build logs for errors
4. Common causes:
   - TypeScript errors
   - Missing dependencies
   - Build timeout

## Environment Variables Management

### Viewing Current Variables

**Via Cloudflare API:**
```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/pages/projects/perception-app" \
  -H "Authorization: Bearer {TOKEN}"
```

### Updating Variables

**Option 1: Via Cloudflare Dashboard**
1. Navigate to Pages project settings
2. Go to "Settings" → "Environment variables"
3. Select "Preview" environment
4. Add/modify variables

**Option 2: Via API** (recommended for bulk updates)
1. Update `/tmp/cf-env.json` with new variables
2. Run API PATCH request (see setup section)

### Required OAuth Token Location

OAuth token is stored in:
```
~/Library/Preferences/.wrangler/config/default.toml
```

**Extract token:**
```bash
cat ~/Library/Preferences/.wrangler/config/default.toml | grep oauth_token
```

## Cloudflare Pages Configuration

### Auto-Deploy Settings

| Setting | Value |
|---------|-------|
| Production branch | `main` |
| Preview branches | All branches (including `staging`) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (project root) |
| Node version | 20 |

### Branch-Specific URLs

- **Production:** https://app.perception.to (custom domain)
- **Staging branch:** https://staging.perception-app.pages.dev (auto-generated)
- **Other branches:** https://[branch-name].perception-app.pages.dev

## Security Considerations

### CORS Whitelist
- Only trusted domains should be in CORS whitelist
- Remove development origins (`localhost`) for production deployments
- Staging domain is safe to include as it requires authentication

### Environment Variables
- Never commit `.env` files to git
- Keep Cloudflare OAuth tokens secure
- Rotate tokens periodically
- Use same Firebase project for all environments (as we do currently)

### Backend Services
- Backend functions are shared between all environments
- No environment-specific backend configuration
- API rate limiting applies to all environments equally

## Rollback Procedure

If staging deployment breaks production:

**Option 1: Revert via Git**
```bash
git checkout main
git revert HEAD
git push origin main
```

**Option 2: Redeploy Previous Commit**
```bash
git checkout main
git reset --hard HEAD~1
git push origin main --force
```

**Option 3: Via Cloudflare Dashboard**
1. Go to Deployments tab
2. Find last working deployment
3. Click "Rollback to this deployment"

## Future Improvements

### Potential Enhancements

1. **Separate Backend Environment:**
   - Create staging-specific Firebase project
   - Deploy functions to both staging and production projects
   - Allows testing backend changes without affecting production

2. **Automated Testing:**
   - Add E2E tests that run on staging deployments
   - Block production deployments if staging tests fail

3. **Environment-Specific Configuration:**
   - Different API rate limits for staging
   - Separate analytics tracking for staging
   - Test data vs production data

4. **Deployment Notifications:**
   - Slack/Discord notifications on deployments
   - Automated health checks after deployment
   - Alert on failed deployments

## Related Documentation

- [Cloudflare Deployment Guide](./CLOUDFLARE-DEPLOYMENT.md)
- [Production Readiness Checklist](./production-readiness.md)
- [Debugging Instructions](./DEBUGGING_INSTRUCTIONS.md)

## Support

**Cloudflare Account:** 565edbf71e00f27e7dc764574a32e04e
**Firebase Project:** perception-app-3db34
**GitHub Repository:** fernikolic/perception-app

For issues or questions, refer to the Cloudflare Pages documentation:
https://developers.cloudflare.com/pages/
