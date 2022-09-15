import type { Officer, Term } from './types';
import { TIERS, VISIBLE_TERMS } from './data';

export function getPositionByTermIndex(
  officer: Officer,
  termIndex: number
): Officer['positions'][Term] | undefined {
  return officer.positions[VISIBLE_TERMS[termIndex]];
}

export function getOfficerTierByTermIndex(officer: Officer, termIndex: number): string | undefined {
  const position = getPositionByTermIndex(officer, termIndex);
  return position ? TIERS[position.tier] : undefined;
}
