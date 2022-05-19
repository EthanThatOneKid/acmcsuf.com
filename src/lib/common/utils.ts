export function parseBool(input?: string | null, defaultValue = false): boolean {
  if (!input) return defaultValue;

  const cleanInput = input.trim().toLowerCase();

  // unlikely NaN will be passed, but included to be safe
  const stringsOtherwiseTruthy = [0, false, NaN].map((v) => String(v).toLowerCase());

  return !stringsOtherwiseTruthy.includes(cleanInput);
}
