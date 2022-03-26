export * from './acm-paths';
export * from './links';
export * from './officers';

// DEBUG flag is activated when anything besides '', '0', or 'false' is selected
export const DEBUG = !['', '0', 'false'].includes(String(import.meta.env.VITE_DEBUG).toLowerCase());
