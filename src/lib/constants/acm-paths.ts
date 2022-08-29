export interface AcmPath {
  title: string;
  slug: string;
  picture: string;
  color: string;
}

export const acmAlgo: AcmPath = {
  title: 'Algo',
  slug: 'algo',
  picture: './assets/badges/algo-team.svg',
  color: 'var(--acm-purple)',
};

export const acmDesign: AcmPath = {
  title: 'Design',
  slug: 'design',
  picture: './assets/badges/design-team.svg',
  color: 'var(--acm-pink)',
};

export const acmDev: AcmPath = {
  title: 'Dev',
  slug: 'dev',
  picture: './assets/badges/dev-team.svg',
  color: 'var(--acm-bluer)',
};

export const acmAI: AcmPath = {
  title: 'AI',
  slug: 'ai',
  picture: './assets/badges/AI-team.svg',
  color: 'var(--acm-emerald)',
};

export const acmGeneral: AcmPath = {
  title: 'General',
  slug: 'general',
  picture: './assets/badges/general.svg',
  color: 'var(--acm-blue)',
};

export const acmPaths = [acmAlgo, acmDesign, acmDev, acmGeneral] as const;

/** Pinned paths are featured on the landing page. */
export const pinnedPaths = [acmAI, acmAlgo, acmDesign, acmDev] as const;
