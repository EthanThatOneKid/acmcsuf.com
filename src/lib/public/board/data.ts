import OFFICERS_JSON from './officers.json';
import TIERS_JSON from './tiers.json';
import type { Officer } from './types';
import { Term } from './types';

export const VISIBLE_TERMS = [Term.Fall22, Term.Spring22, Term.Fall21, Term.Spring21];

export const OFFICERS: Officer[] = [...OFFICERS_JSON];

export const TIERS: string[] = [...TIERS_JSON];
