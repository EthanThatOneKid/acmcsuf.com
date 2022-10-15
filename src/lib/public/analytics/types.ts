export type { Metric } from 'web-vitals';

export interface AnalyticsOptions {
  id?: string;
  url?: string;
  path: string;
  params: Record<string, string>;
  navigator: Navigator;
  debug?: boolean;
}
