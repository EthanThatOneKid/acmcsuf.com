export function isStringTruthy(payload?: string | null, defaultValue = false): boolean {
  if (!payload) return false;

  return !['false', '0', ''].includes(str.toLowerCase());
}
