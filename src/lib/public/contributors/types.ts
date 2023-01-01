export interface Contributor {
  name: string;
  login: string;
  picture: string;
  bio: string;
  url: string;
  contributions: Contribution[];
  posts: { title: string; url: string }[];
  from: string;
  to: string;
}

export interface Contribution {
  url: string;
  message: string;
  associatedPRs: {
    url: string;
    number: number;
    closedAt: string;
  }[];
}

export interface Release {
  version: string;
  date: string;
  url: string;
  description: string;
}
