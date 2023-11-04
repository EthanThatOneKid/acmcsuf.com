import type { Officer, Term, Tier } from './types';
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
 * getTierByID returns the tier with the given ID.
 */
export function getTierByID(id: number): Tier | undefined {
  return Object.values(TIERS_JSON).find((t) => t.id === id);
}

/**
 * getMembers returns a list of members that are associated with
 * the given term and tiers.
 */
export function getMembers(members: Officer[], term: Term, tierIDs?: number[]): Officer[] {
  if (!tierIDs) {
    return [];
  }

  return members
    .filter((member) => {
      const position = member.positions[term];
      if (!position) {
        return false;
      }

      return tierIDs.some((tierID) => tierID === position.tier);
    })
    .sort((a, b) => {
      const aTier = getTierByID(a.positions[term]!.tier)!;
      const bTier = getTierByID(b.positions[term]!.tier)!;
      return aTier.index - bTier.index;
    });
}
