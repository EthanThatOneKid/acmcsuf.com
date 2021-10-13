export interface AcmPath {
  title: string;
  slug: string;
  picture: string;
  color: string;
}

export const acmAlgo: AcmPath = {
  title: "Algo",
  slug: "acmalgo",
  picture: "./assets/badges/with-shadow/algo.svg",
  color: "var(--acm-purple)",
};

export const acmCreate: AcmPath = {
  title:"Create",
  slug:"acmcreate",
  picture: "./assets/badges/with-shadow/create.svg",
  color: "var(--acm-pink)"
};

export const acmDev: AcmPath = {
  title: "Dev",
  slug: "acmdev",
  picture: "./assets/badges/with-shadow/dev.svg",
  color: "var(--acm-bluer)"
};


export const acmPaths = [
  acmAlgo, acmCreate, acmDev
] as const;