interface AcmPath {
  title: string;
  slug: string;
  picture: string;
  color: string;
}

const acmAlgo: AcmPath = {
  title: "Algo",
  slug: "acmalgo",
  picture: "./assets/png/acm-algo-badge.png",
  color: "var(--acm-purple)",
};

const acmCreate: AcmPath = {
  title:"Create",
  slug:"acmcreate",
  picture: "./assets/png/acm-create-badge.png",
  color: "var(--acm-pink)"
};

const acmDev: AcmPath = {
  title: "Dev",
  slug: "acmdev",
  picture: "./assets/png/acm-dev-badge.png",
  color: "var(--acm-bluer)"
};


export const acmPaths = [
  acmAlgo, acmCreate, acmDev
] as const;