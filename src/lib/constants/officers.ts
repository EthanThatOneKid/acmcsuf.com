import OFFICERS_JSON from './officers.json';

export interface Officer {
  name: string;
  positions: Record<string, string>;
  picture?: string;
  url?: string;
}

export const TERM_SPRING_21 = 'S21';
export const TERM_FALL_21 = 'F21';
export const TERM_SPRING_22 = 'S22';

export const TERMS = [TERM_SPRING_22, TERM_FALL_21, TERM_SPRING_21];

export const OFFICERS: Officer[] = [...OFFICERS_JSON];
