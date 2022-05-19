export * from './acm-paths';
export * from './links';
export * from './officers';

import { determineTruthyString } from '../common/utils';

// DEBUG flag is activated when anything besides '', '0', or 'false' is selected
export const DEBUG = determineTruthyString(import.meta.env.VITE_DEBUG);
