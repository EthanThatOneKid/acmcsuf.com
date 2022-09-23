export interface BlogOutput {
  labels: string[];
  posts: BlogPost[];
}

export interface BlogPost {
  id: number;
  url: string;
  discussionUrl: string;
  title: string;
  html: string;
  createdAt: string;
  lastEdited: string | null;
  labels: string[];
  author: {
    displayname: string;
    url: string;
    picture: string;
  };
}

export interface BlogFetchOptions {
  id?: number;
  labels: string[];
}
