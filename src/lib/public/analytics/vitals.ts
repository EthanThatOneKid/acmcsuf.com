import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';
import type { AnalyticsOptions, Metric, ReportCallback, ReportOpts } from './types';

export function send(
  options: AnalyticsOptions,
  handlers = [onFID, onTTFB, onLCP, onCLS, onFCP]
): void {
  if (!options.id) return;

  try {
    handlers.forEach((handler) => doVital(handler, options));
  } catch (err) {
    console.error('[Analytics]', err);
  }
}

function doVital(
  handler: (onReport: ReportCallback, opts?: ReportOpts | undefined) => void,
  options: AnalyticsOptions
): void {
  handler((metric: Metric) => sendToAnalytics(metric, options));
}

type VitalsNavigator = Navigator & { connection: { effectiveType: string } };

function sendToAnalytics(metric: Metric, options: AnalyticsOptions) {
  if (!options.url) {
    options.url = 'https://vitals.vercel-analytics.com/v1/vitals';
  }

  const page = Object.entries(options.params).reduce(
    (acc, [key, value]) => acc.replace(value, `[${key}]`),
    options.path
  );

  const body: Record<string, string> = {
    dsn: String(options.id),
    id: metric.id,
    page,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(options.navigator as VitalsNavigator),
  };

  if (options.debug) {
    console.log('[Analytics]', metric.name, JSON.stringify(body, null, 2));
  }

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`:
    type: 'application/x-www-form-urlencoded',
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(options.url, blob);
  } else
    fetch(options.url, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
}

function getConnectionSpeed(navigator: VitalsNavigator): string {
  return 'connection' in navigator &&
    navigator['connection'] &&
    'effectiveType' in navigator['connection']
    ? navigator['connection']['effectiveType']
    : '';
}
