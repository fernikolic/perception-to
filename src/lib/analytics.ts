/**
 * Analytics utilities for GTM/GA4 tracking
 * Handles UTM parameter capture and conversion events
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// UTM parameters we want to track
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const STORAGE_KEY = 'perception_attribution';

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
  timestamp?: string;
}

/**
 * Capture UTM parameters from URL and store them
 * Should be called once on app initialization
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const hasUtmParams = UTM_PARAMS.some(param => urlParams.has(param));

  // Only update attribution if we have new UTM params (new campaign visit)
  if (hasUtmParams) {
    const attribution: AttributionData = {};

    UTM_PARAMS.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        attribution[param] = value;
      }
    });

    attribution.referrer = document.referrer || undefined;
    attribution.landing_page = window.location.pathname;
    attribution.timestamp = new Date().toISOString();

    // Store in localStorage for persistence across sessions
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));

    // Push to dataLayer for GTM
    pushToDataLayer({
      event: 'attribution_captured',
      ...attribution
    });
  } else if (!localStorage.getItem(STORAGE_KEY)) {
    // First visit without UTM - capture referrer and landing page
    const attribution: AttributionData = {
      referrer: document.referrer || undefined,
      landing_page: window.location.pathname,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  }
}

/**
 * Get stored attribution data
 */
export function getAttribution(): AttributionData | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Push event to GTM dataLayer
 */
export function pushToDataLayer(data: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/**
 * Track conversion event with attribution data
 */
export function trackConversion(eventName: string, eventData?: Record<string, unknown>): void {
  const attribution = getAttribution();

  pushToDataLayer({
    event: eventName,
    ...eventData,
    // Include attribution for conversion analysis
    attribution_source: attribution?.utm_source,
    attribution_medium: attribution?.utm_medium,
    attribution_campaign: attribution?.utm_campaign,
  });
}

/**
 * Track newsletter signup conversion
 */
export function trackNewsletterSignup(location: string): void {
  trackConversion('newsletter_signup', {
    signup_location: location, // e.g., 'footer', 'exit_intent', 'inline'
  });
}

/**
 * Track trial start conversion
 */
export function trackTrialStart(plan: string): void {
  trackConversion('trial_start', {
    plan_type: plan, // e.g., 'pro', 'premium'
  });
}

/**
 * Track CTA click (for attribution analysis)
 */
export function trackCtaClick(ctaName: string, destination?: string): void {
  pushToDataLayer({
    event: 'cta_click',
    cta_name: ctaName,
    cta_destination: destination,
  });
}
