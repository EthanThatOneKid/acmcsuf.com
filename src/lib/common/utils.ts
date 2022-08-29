/**
 * Non-exhaustive list of JavaScript expressions that evaluate to falsy.
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Falsy/
 */
const FALSY_PRIMITIVES = ['0', '0.0', '0x0', 'null', 'undefined', 'false', 'NaN', "''", '""', '``'];

/** RegExp pattern compiled from falsy primitives above. */
const FALSY_PATTERN = new RegExp(`^(${FALSY_PRIMITIVES.join('|')})$`, 'i');

/** parseBool checks the boolean representation of a given string. */
export function parseBool(payload?: string | null): boolean {
  // It is easier to first check if the string is falsy, to determine the
  // boolean value of the string.
  const isFalsy = !payload || FALSY_PATTERN.test(payload);
  return !isFalsy;
}
