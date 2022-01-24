import type { Officer } from '$lib/constants';
import { OFFICERS } from '$lib/constants';

export interface Newsletter {
  id: string;
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

function formatNewsletters(output): Newsletter[] {
  const discussions = output.data.repository.discussions.nodes;
  return discussions.map(
    (discussion: any): Newsletter => ({
      id: discussion.number,
      url: `https://acmcsuf.com/blog/${discussion.number as string}`,
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
