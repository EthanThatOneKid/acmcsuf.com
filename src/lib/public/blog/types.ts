export interface BlogOutput {
  labels: string[];
  posts: BlogPost[];
}

export interface BlogPost {
  id: number;
  url: string;
  discussionURL: string;
  title: string;
  html: string;
  bodyText: string;
  createdAt: string;
  lastEdited: string | null;
  labels: string[];
  author: {
    displayname: string;
    fullname?: string;
    url: string;
    picture: string;
  };
}

export interface BlogFetchOptions {
  id?: number;
  labels: string[];
}
