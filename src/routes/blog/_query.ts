import type { Officer } from '$lib/constants';
import { OFFICERS } from '$lib/constants';

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
    discussions(first: 100, categoryId: "${import.meta.env.VITE_GH_DISCUSSION_CATEGORY_ID}") {
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

function getOfficerByGhUsername(ghUsername: string): Officer | null {
  // get author by GitHub username
  const officer = OFFICERS.find((o) => o.ghUsername !== undefined && o.ghUsername === ghUsername);
  return officer ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatNewsletters(output: any): Newsletter[] {
  const discussions = output.data.repository.discussions.nodes;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return discussions.map((discussion: any): Newsletter => {
    const { title, author, number: id, bodyHTML: html, url: discussionUrl } = discussion;
    const url = 'https://acmcsuf.com/blog/' + id;
    const lastEdited = discussion.lastEditedAt ?? discussion.createdAt;
    const labels = discussion.labels.nodes.map(({ name }) => name);
    const officer = getOfficerByGhUsername(author.login);
    const authorUrl: string = officer?.url ?? author.url;
    const displayname: string = officer?.name ?? author.login;
    const picture: string = officer?.picture ?? author.avatarUrl;

    return {
      id,
      url,
      discussionUrl,
      title,
      html,
      lastEdited,
      labels,
      author: { url: authorUrl, displayname, picture },
    };
  });
}

export async function fetchNewsletters(): Promise<Newsletter[]> {
  const ghAccessToken = import.meta.env.VITE_GH_ACCESS_TOKEN;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `token ${ghAccessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: newslettersQuery }),
  });

  const newsletters = formatNewsletters(await response.json());
  return newsletters;
}
