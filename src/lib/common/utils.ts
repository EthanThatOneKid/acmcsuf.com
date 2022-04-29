export function isStringTruthy(payload?: string | null, defaultValue = false): boolean {
  if (!payload) return defaultValue;

  // unlikely NaN will be passed, but included to be safe
  return !['0', 'false', 'nan'].includes(payload.trim().toLowerCase());
}
