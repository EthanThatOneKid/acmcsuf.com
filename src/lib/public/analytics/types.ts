export type { Metric, ReportHandler, ReportCallback, ReportOpts } from 'web-vitals';

export interface AnalyticsOptions {
  id?: string;
  url?: string;
  path: string;
  params: Record<string, string>;
  navigator: Navigator;
  debug?: boolean;
}
