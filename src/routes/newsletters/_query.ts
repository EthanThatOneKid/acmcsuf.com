const id = import.meta.env.VITE_GH_DISCUSSION_CATEGORY_ID;

export interface Newsletter {
  id: number;
  url: string;
  discussionUrl: string;
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
    discussions(first: 100, categoryId: "DIC_kwDOE7ysSc4CAC0o") {
      nodes {
        title
        url
        number
        bodyHTML
        createdAt
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

/* eslint-disable */
const formatNewsletters = (output: any): Newsletter[] => {
  const discussions = output.data.repository.discussions.nodes;
  return discussions.map(
    (discussion: any): Newsletter => ({
      id: discussion.number,
      url: `https://acmcsuf.com/newsletters/${discussion.number as string}`,
      discussionUrl: discussion.url,
      title: discussion.title,
      html: discussion.bodyHTML,
      lastEdited: discussion.lastEditedAt ?? discussion.createdAt,
      labels: discussion.labels.nodes.map(({ name }) => name),
      author: {
        displayname: discussion.author.login,
        url: discussion.author.url,
        picture: discussion.author.avatarUrl,
      },
    })
  );
};
/* eslint-enable */

export const fetchNewsletters = async (): Promise<Newsletter[]> => {
  const ghAccessToken = import.meta.env.VITE_GH_ACCESS_TOKEN;
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `token ${ghAccessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: newslettersQuery }),
  });
  const newsletters = formatNewsletters(await response.json());
  return newsletters;
};
