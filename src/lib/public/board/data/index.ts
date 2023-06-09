import { Term, type Team } from '$lib/public/board/types';
import OFFICERS_JSON from './officers.json';
import TIERS_JSON from './tiers.json';
import TEAMS_JSON from './teams.json';

export { OFFICERS_JSON, TIERS_JSON, TEAMS_JSON };

export const VISIBLE_TERMS = [
  Term.Spring23,
  Term.Fall22,
  Term.Spring22,
  Term.Fall21,
  Term.Spring21,
];

export const TIERS = { ...TIERS_JSON };

export const OFFICERS = [...OFFICERS_JSON];

/** TEAMS is a map of internal teams by their name, {@link Team.id}. */
export const TEAMS = [...TEAMS_JSON].reduce(
  (tt: { [key: (typeof TEAMS_JSON)[number]['id']]: Team }, t) => {
    tt[t.id] = t;
    return tt;
  },
  {}
);

/** Pinned paths are featured on the landing page. */
export const PINNED_TEAMS = [TEAMS.ai, TEAMS.algo, TEAMS.design, TEAMS.dev] as const;
