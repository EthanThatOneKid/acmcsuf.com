import { Term } from '$lib/public/board/types';
import OFFICERS_JSON from './officers.json';
import TIERS_JSON from './tiers.json';

export const VISIBLE_TERMS = [Term.Fall22, Term.Spring22, Term.Fall21, Term.Spring21];

export const TIERS = { ...TIERS_JSON };

export const OFFICERS = [...OFFICERS_JSON];
