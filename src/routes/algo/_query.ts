import type { Officer } from '$lib/constants';
import { OFFICERS } from '$lib/constants';

export interface AlgoResource {
  id: number;
  url: string;
  discussionUrl: string;
  title: string;
  html: string;
  createdAt: number | null;
  lastEdited: number | null;
  labels: string[];
  author: {
    displayname: string;
    url: string;
    picture: string;
  };
}

/**
 * GraphQL query to get all the algo posts from the newsletters category.
 * @see https://docs.github.com/en/graphql/overview/explorer
 */
export const newslettersQuery = `{
  repository(owner: "ethanthatonekid", name: "acmcsuf.com") {
    discussions(first: 100, categoryId: "${import.meta.env.VITE_GH_ALGO_CATEGORY_ID}") {
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
  const officer = OFFICERS.find((o) => o.displayName !== undefined && o.displayName === ghUsername);
  return officer ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatNewsletters(output: any): AlgoResource[] {
  console.log({ output });
  const discussions = output.data.repository.discussions.nodes;

  /**
   * No types exist for the discussion object, as the structure is generated
   * based on the GraphQL {@link newslettersQuery}.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return discussions.map((discussion: any): AlgoResource => {
    const {
      title,
      author,
      createdAt,
      lastEditedAt: lastEdited,
      number: id,
      bodyHTML: html,
      url: discussionUrl,
    } = discussion;
    const url = '/algo/' + id;
    const labels = discussion.labels.nodes.map(({ name }) => name);
    const officer = getOfficerByGhUsername(author.login);
    const authorUrl: string = author.url;
    const displayname: string = officer?.fullName ?? author.login;
    const picture: string = officer?.picture ?? author.avatarUrl;

    return {
      id,
      url,
      discussionUrl,
      title,
      html,
      createdAt,
      lastEdited,
      labels,
      author: { url: authorUrl, displayname, picture },
    };
  });
}

export async function fetchNewsletters(): Promise<AlgoResource[]> {
  const ghAccessToken = import.meta.env.VITE_GH_ACCESS_TOKEN;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `token ${ghAccessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: newslettersQuery }),
  });

  const newsletters = formatNewsletters(await response.json());
  return newsletters;
}
