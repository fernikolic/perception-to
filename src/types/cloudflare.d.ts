/**
 * Type definitions for Cloudflare Workers environment
 */

interface GlobalCaches {
  readonly default: Cache;
  readonly [name: string]: Cache;
}

declare global {
  var caches: GlobalCaches;
} 