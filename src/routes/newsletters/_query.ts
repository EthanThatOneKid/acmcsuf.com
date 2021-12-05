const id = import.meta.env.VITE_GH_DISCUSSION_CATEGORY_ID;

export interface Newsletter {
  id: number;
  title: string;
  html: string;
  lastEdited: number | null;
  labels: string[];
  author: {
    displayname: string;
    url: string;
    picture: string;
  };
}

// @see https://docs.github.com/en/graphql/overview/explorer
export const newslettersQuery = `{
  repository(owner: "ethanthatonekid", name: "acmcsuf.com") {
    discussions(first: 100, categoryId: "${id}") {
      nodes {
        title
        number
        bodyHTML
        lastEditedAt
        
        author {
          login
          url
          avatarUrl
        }
        
        labels(first: 100) {
          nodes {
            name
          }
        }
      }
    }
  }
}`;
