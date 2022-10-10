import type { AnalyticsOptions } from './types';
import { onCLS, onFCP, onFID, onLCP, onTTFB, sendToAnalytics } from './vitals';

export function send(options: AnalyticsOptions): void {
  if (!options.id) return;

  try {
    onFID((metric) => sendToAnalytics(metric, options));
    onTTFB((metric) => sendToAnalytics(metric, options));
    onLCP((metric) => sendToAnalytics(metric, options));
    onCLS((metric) => sendToAnalytics(metric, options));
    onFCP((metric) => sendToAnalytics(metric, options));
  } catch (err) {
    console.error('[Analytics]', err);
  }
}
