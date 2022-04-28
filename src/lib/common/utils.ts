export function isStringTruthy(str: string): boolean {
  if (str == null) {
    return false;
  }

  return !['false', '0', ''].includes(str.toLowerCase());
}
