export interface AcmPath {
  title: string;
  slug: string;
  picture: string;
  color: string;
}

export const acmAlgo: AcmPath = {
  title: "Algo",
  slug: "acmalgo",
  picture: "./assets/png/acm-algo-badge.png",
  color: "var(--acm-purple)",
};

export const acmCreate: AcmPath = {
  title:"Create",
  slug:"acmcreate",
  picture: "./assets/png/acm-create-badge.png",
  color: "var(--acm-pink)"
};

export const acmDev: AcmPath = {
  title: "Dev",
  slug: "acmdev",
  picture: "./assets/png/acm-dev-badge.png",
  color: "var(--acm-bluer)"
};


export const acmPaths = [
  acmAlgo, acmCreate, acmDev
] as const;