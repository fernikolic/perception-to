# Cloudflare Deployment Guide

This document outlines the process for deploying the Perception Dashboard to Cloudflare Pages.

**Note:** For staging environment setup and workflow, see [STAGING-ENVIRONMENT.md](./STAGING-ENVIRONMENT.md).

## Headers Configuration

The application includes security headers using Cloudflare's `_headers` file format, which is placed in the root of the deployed site. These headers include:

- Content Security Policy (CSP) directives
- Frame protection (X-Frame-Options)
- Content type protection (X-Content-Type-Options)
- Referrer Policy
- Permissions Policy

## Deployment Steps

1. **Build the application for Cloudflare deployment**:
   ```bash
   npm run build:cloudflare
   ```
   This generates a production build in the `dist` directory and copies the Cloudflare-specific headers file.

2. **Deploy to Cloudflare Pages**:
   - Connect your GitHub repository to Cloudflare Pages
   - Set the build command to `npm run build:cloudflare`
   - Set the build output directory to `dist`
   - Configure environment variables in the Cloudflare Pages dashboard

3. **Verify headers**:
   After deployment, verify that the security headers are correctly applied by:
   - Opening your site in a browser
   - Opening Developer Tools
   - Going to the Network tab
   - Selecting any HTML document response
   - Checking the Response Headers section

## Environment-Specific Headers

- **Production**: The standard `_headers` file is used for production deployments
- **Development**: The `_headers.dev` file contains more permissive settings for development

## API Integrations

Since you're no longer using Firebase Hosting, ensure that your Cloudflare deployment has the correct proxies configured for:

- Stripe integration
- Firebase Functions calls
- Any other API endpoints

You may need to configure [Cloudflare Workers](https://developers.cloudflare.com/workers/) to proxy requests to Firebase or other backend services.

## Troubleshooting

If headers are not being applied correctly:

1. Ensure the `_headers` file is in the root of your deployed site
2. Verify the file format follows [Cloudflare's specification](https://developers.cloudflare.com/pages/configuration/headers/)
3. Check for any syntax errors in your headers configuration
4. Purge the Cloudflare cache after making changes 