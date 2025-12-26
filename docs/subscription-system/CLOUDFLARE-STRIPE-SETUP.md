# Stripe Integration with Cloudflare

This documentation explains how the Stripe Customer Portal integration works with our Cloudflare-hosted application.

## Overview

Our application uses Stripe for subscription management and customer billing. Since the app is hosted on Cloudflare Pages, we've implemented a solution that allows secure communication between our frontend and the Stripe API via Firebase Functions.

## Architecture

The integration follows this three-tiered approach:

1. **Tier 1 (Primary)**: Direct Firebase Functions call
   - The application attempts to call Firebase Functions directly first
   - This is the fastest and most reliable method when available

2. **Tier 2 (Secondary)**: Cloudflare Pages Functions
   - If Firebase Functions are unavailable, the app falls back to using Cloudflare Pages Functions
   - The Pages Function acts as a proxy, forwarding the request to Firebase

3. **Tier 3 (Last Resort)**: Direct Stripe Portal
   - If both Firebase and Cloudflare fail, the user is directed to Stripe's hosted billing portal
   - This ensures users can always access their billing information

## File Structure

### Frontend

- `src/hooks/useStripePortal.ts` - React hook that provides methods to access the Stripe portal
  - Implements all three tiers of the fallback mechanism
  - Handles authentication and comprehensive error handling
  - Includes a health check to verify the proxy availability

### Cloudflare Pages Functions

- `functions/api/stripe-portal.js` - API endpoint for Stripe portal access
  - Handles GET requests for health checks
  - Handles POST requests to proxy to Firebase
  - Handles OPTIONS requests for CORS preflight
  - Returns proper JSON responses with appropriate headers

### Configuration

- `functions/_routes.json` - Routing configuration
  - Defines which paths are handled by functions vs. static assets
  - Ensures `/api/*` paths are correctly routed

### Build Process

- `package.json` scripts
  - Ensures functions directory is copied to the dist directory during build
  - Creates the correct file structure for Cloudflare Pages deployment

## How It Works: The Complete Flow

1. User clicks "Manage Subscription" in the application UI
2. The `redirectToPortal` function in `useStripePortal.ts` is called
3. The function attempts to use Firebase Functions directly
4. If that fails, it checks if the Cloudflare proxy is available
5. If available, it makes a request to the `/api/stripe-portal` endpoint
6. The Pages Function forwards the request to Firebase
7. Firebase communicates with Stripe to generate a portal URL
8. If both methods fail, the user is directed to Stripe's hosted billing portal
9. The user is redirected to the appropriate portal URL

## Deployment to Cloudflare Pages

1. Build the application with:
   ```bash
   npm run build:cloudflare
   ```

2. Deploy to Cloudflare Pages:
   - The build output in `dist/` contains:
     - Static assets (HTML, CSS, JS)
     - `_headers` file for security headers
     - `functions/` directory for Pages Functions

3. Cloudflare Pages will automatically:
   - Deploy the static assets to the CDN
   - Deploy the Functions to Cloudflare Workers
   - Apply the security headers from `_headers`

## Troubleshooting

If the Stripe portal doesn't open:

1. Check browser console logs for errors
2. Verify which tier of the fallback mechanism is failing:
   - Firebase Functions errors: "Service functions is not available"
   - Cloudflare proxy errors: "Stripe portal proxy is not available"
   - Stripe direct access errors: Will be rare, but may occur if user credentials are invalid

3. For specific error types:
   - 405 Method Not Allowed: Check that the Cloudflare Function is set up correctly
   - JSON parsing errors: Ensure the function is returning proper JSON and not HTML
   - CORS errors: Verify the appropriate headers are being sent

## Testing

To test the Stripe integration:

1. Test each tier individually:
   - Direct Firebase: Use the Firebase console to check function logs
   - Cloudflare Proxy: Visit `/api/stripe-portal` directly to check health status
   - Direct Stripe access: Test the URL generation with valid customer IDs

2. Test the complete flow through the UI:
   - Log in as a subscribed user
   - Navigate to settings/subscription
   - Click "Manage Subscription"
   - Verify successful redirect to the portal 