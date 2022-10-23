import type { Officer, Term } from './types';
import { VISIBLE_TERMS } from './data';
import { writable } from 'svelte/store';

export const termIndex = writable<number>(0);

export function getPositionByTermIndex(
  officer: Officer,
  termIndex: number
): Officer['positions'][Term] | undefined {
  return officer.positions[VISIBLE_TERMS[termIndex]];
}
