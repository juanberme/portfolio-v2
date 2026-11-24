import { track as vercelTrack } from "@vercel/analytics";

/**
 * Custom click events (Download CV, Email me, View case, language switch).
 *
 * OFF for now: custom events need a paid Vercel plan. Page views and Speed Insights work on
 * the free plan without this. To turn the events on later, set this to true.
 */
export const CUSTOM_EVENTS_ENABLED = false;

export function track(name: string, props?: Record<string, string | number | boolean>) {
  if (!CUSTOM_EVENTS_ENABLED) return;
  vercelTrack(name, props);
}
