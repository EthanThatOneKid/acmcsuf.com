import type { Team } from '$lib/public/board/types';
import TEAMS_JSON from './teams.json' assert { type: 'json' };

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
