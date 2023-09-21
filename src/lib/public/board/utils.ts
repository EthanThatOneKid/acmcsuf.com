import type { Officer, Term } from './types';
import { VISIBLE_TERMS, TIERS_JSON } from './data';
import { writable } from 'svelte/store';

/**
 * termIndex is the index of the term to display in the board.
 */
export const termIndex = writable<number>(0);

/**
 * getPositionByTermIndex returns the position held by the officer in the given
 * term index.
 */
export function getPositionByTermIndex(
  officer: Officer,
  termIndex: number
): Officer['positions'][Term] | undefined {
  return officer.positions[VISIBLE_TERMS[termIndex]];
}

/**
 * Tier is a tier used for deterministic ordering for listing board members on
 * a webpage.
 */
export type Tier = (typeof TIERS_JSON)[keyof typeof TIERS_JSON];

/**
 * getTierByID returns the tier with the given ID.
 */
export function getTierByID(id: number): Tier | undefined {
  return Object.values(TIERS_JSON).find((t) => t.id === id);
}
