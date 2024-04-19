import type { Officer, Term, Tier, Team } from './types';
import { VISIBLE_TERMS, TIERS_JSON, TEAMS_JSON, OFFICERS_JSON } from './data';
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
      const positions = member.positions[term];
      if (!positions) {
        return false;
      }

      return tierIDs.some((tierID) => positions.some((position) => position.tier === tierID));
    })
    .sort((a, b) => {
      const aTier = getTierByID(
        Math.min(
          ...a.positions[term]!.map(({ tier }) => tier).filter((tier) => tierIDs.includes(tier))
        )
      ) || { index: 0 };
      const bTier = getTierByID(
        Math.min(
          ...b.positions[term]!.map(({ tier }) => tier).filter((tier) => tierIDs.includes(tier))
        )
      ) || { index: 0 };
      return aTier.index - bTier.index;
    });
}

/**
 * getTeamByID returns the team with the given ID.
 */
export function getTeamByID(id: string): Team | undefined {
  return TEAMS_JSON.find((t) => t.id === id);
}

/**
 * getOfficerByGhUsername returns the officer with the given GitHub username.
 */
export function getOfficerByGhUsername(ghUsername: string): Officer | null {
  // get author by GitHub username
  const officer = OFFICERS_JSON.find((o) => o.fullName !== undefined && o.fullName === ghUsername);
  return officer ?? null;
}
