import { doQuery } from '$lib/server/gql/github';

import type { Certificate, PR } from '$lib/public/certificates';
import type { PRsResponse, CertificateQuery, PRsQuery, ReleasesResponse, ReleaseNode } from './gql';
import { makeReleasesQuery, makePRsQuery } from './gql';

/**
 * Retrieves a page of merged pull requests.
 */
async function getPRs(q: PRsQuery): Promise<PR[]> {
  // Initialize the array of pull requests
  const prs: PR[] = [];

  // Fetch pages of pull requests until pagination is exhausted.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const prResponse = await doQuery<PRsResponse>(makePRsQuery(q));
    prs.push(
      ...prResponse.search.edges.map(
        (edge): PR => ({
          mergedAt: edge.node.mergedAt,
          title: edge.node.title,
          number: edge.node.number,
          url: edge.node.url,
          commits: edge.node.commits.edges.map((edge) => ({
            message: edge.node.commit.message,
            url: edge.node.commit.url,
          })),
        })
      )
    );

    // Check if there are more pages of pull requests
    if (!prResponse.search.pageInfo.hasNextPage) {
      break;
    }

    // Update the cursor for pagination
    q.cursor = prResponse.search.pageInfo.endCursor;
  }

  // Return the array of pull requests
  return prs;
}

/**
 * Retrieves a certificate showing the relevant pull requests made by a particular user in the duration of two releases.
 */
export async function getCertificate(q: CertificateQuery): Promise<Certificate> {
  // Make the releases query.
  const releaseData = await doQuery<ReleasesResponse>(makeReleasesQuery(q));

  // Get the start and end dates for the releases.
  const pair = findReleasePair(releaseData, q.release);
  if (!pair) {
    throw new Error('Release not found');
  }

  const earlier = pair[0]?.createdAt || '0000-00-00T00:00:00Z';
  const later = pair[1].createdAt;

  // Get the pull requests made by the user.
  const prs = await getPRs({
    username: q.username,
    owner: q.owner,
    name: q.name,
    startDate: earlier,
    endDate: later,
    maxPageSize: q.maxPageSize,
  });

  // Return the certificate.
  return {
    user: {
      login: q.username,
      name: 'Your Name',
      url: `https://github.com/${q.username}`,
      bio: '',
      picture: '/assets/authors/placeholder.webp',
    },
    merged: prs,
    from: {
      tagName: pair[0]?.tagName || '',
      date: earlier,
    },
    to: {
      tagName: pair[1].tagName,
      date: later,
    },
  };
}

/**
 * A function to find the pair of subsequent releases in a releases response.
 * The release argument is used as the index of the latest release to find the pair for
 * if it is a number, or as the name of the release to find the pair for if it is a string.
 * The pair will be returned as an array of two release nodes in the order of the releases.
 * If no release is found, the function will return undefined.
 */
function findReleasePair(
  data: ReleasesResponse,
  release: number | string
): [ReleaseNode | undefined, ReleaseNode] | undefined {
  // Find the index of the release.
  const index =
    typeof release === 'number'
      ? release
      : data.repository.releases.edges.findIndex((edge) => edge.node.tagName === release);
  if (!Object.hasOwn(data.repository.releases.edges, index)) {
    return undefined;
  }

  // Find the start and end dates for the query
  const {
    [index + 1]: { node: one },
    [index]: { node: two },
  } = data.repository.releases.edges;

  return [one, two];
}
