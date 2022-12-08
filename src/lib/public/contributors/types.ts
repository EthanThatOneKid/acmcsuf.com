export interface Contributor {
  name: string;
  login: string;
  picture: string;
  bio: string;
  url: string;
  contributions: Contribution[];
  posts: { title: string; url: string }[];
}

export interface Contribution {
  url: string;
  message: string;
  associatedPRURL: string;
  closedAt: string;
}

export interface Release {
  version: string;
  date: string;
  url: string;
  description: string;
}
