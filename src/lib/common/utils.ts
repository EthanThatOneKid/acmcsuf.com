export function isStringTruthy(payload?: string | null, defaultValue = false): boolean {
  if (str == null) {
    return false;
  }

  return !['false', '0', ''].includes(str.toLowerCase());
}
