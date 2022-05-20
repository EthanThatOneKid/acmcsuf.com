export function parseBool(payload?: string | null, defaultValue = false): boolean {
  if (!payload) return defaultValue;

  payload = payload.trim().toLowerCase();

  // unlikely NaN will be passed, but included to be safe
  const stringsOtherwiseTruthy = [0, false, NaN].map((v) => String(v).toLowerCase());

  return !stringsOtherwiseTruthy.includes(payload);
}
