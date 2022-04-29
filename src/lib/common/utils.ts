export function isStringTruthy(payload?: string | null, defaultValue = false): boolean {
  if (!payload) return false;

  return !['0', 'false'].includes(payload.trim().toLowerCase());
}
