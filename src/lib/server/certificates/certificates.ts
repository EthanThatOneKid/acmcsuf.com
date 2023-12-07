import { doQuery } from '$lib/server/gql/github';
import { getOfficerByGhUsername } from '$lib/public/board';
import type {
  RepositoryCertificate,
  ReleaseCertificate,
  PR,
  RepositoryCertificatePageData,
  ReleaseCertificatePageData,
} from '$lib/public/certificates';
import type {
  PRsResponse,
  UserResponse,
  ReleaseCertificateQuery,
  RepositoryCertificateQuery,
  PRsQuery,
  ReleasesResponse,
  ReleaseNode,
} from './gql';
import { makeReleasesQuery, makePRsQuery, makeUserQuery } from './gql';

/**
 * getPRs retrieves a page of merged pull requests.
 */
async function getPRs(q: PRsQuery): Promise<PR[]> {
  // Initialize the array of pull requests
  const prs: PR[] = [];

  // Fetch pages of pull requests until pagination is exhausted.
  let limit = 1e3;
  while (limit--) {
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
 * getReleaseCertificatePageData retrieves a certificate showing the relevant pull requests made by a particular user in the duration of two releases.
 */
export async function getReleaseCertificatePageData(
  q: ReleaseCertificateQuery
): Promise<ReleaseCertificatePageData> {
  const releaseData = await doQuery<ReleasesResponse>(
    makeReleasesQuery({
      owner: q.owner,
      name: q.name,
      username: q.username,
    })
  );

  if (!releaseData.user) {
    throw new Error('User not found!');
  }

  // Get the start and end dates for the releases.
  const pair = findReleasePair(releaseData, q.release);
  if (!pair) {
    throw new Error('Release not found');
  }

  const earlier = pair[0]?.createdAt;
  const later = pair[1].createdAt;

  const prs = await getPRs({
    username: q.username,
    owner: q.owner,
    name: q.name,
    startDate: earlier,
    endDate: later,
    maxPageSize: q.maxPageSize,
  });

  const officer = getOfficerByGhUsername(q.username);
  const certificate: ReleaseCertificate = {
    user: {
      login: q.username,
      name: officer?.fullName || releaseData.user.name || `@${q.username}`,
      url: `https://github.com/${q.username}`,
      bio: releaseData.user.bioHTML,
      picture: officer?.picture ? `/people/${officer.picture}` : releaseData.user.avatarUrl,
    },
    merged: prs,
    from: {
      tagName: pair[0]?.tagName || 'The Beginning',
      date: earlier || 'The Beginning',
    },
    to: {
      tagName: pair[1].tagName,
      date: later,
    },
    releases: releaseData.repository.releases.edges.map((edge) => ({
      name: edge.node.name,
      createdAt: edge.node.createdAt,
      tagName: edge.node.tagName,
    })),
  };

  // Return the page data.
  return { certificate };
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
  const { [index + 1]: one, [index]: two } = data.repository.releases.edges;

  return [one?.node, two.node];
}

/**
 * getRepositoryCertificatePageData retrieves a certificate showing the relevant pull requests made by a particular user in the duration of two releases.
 */
export async function getRepositoryCertificatePageData(
  q: RepositoryCertificateQuery
): Promise<RepositoryCertificatePageData> {
  const userData = await doQuery<UserResponse>(makeUserQuery(q.username));
  const prs = await getPRs({
    username: q.username,
    owner: q.owner,
    name: q.name,
    startDate: new Date(0).toISOString(),
    endDate: new Date().toISOString(),
    maxPageSize: q.maxPageSize,
  });

  const officer = getOfficerByGhUsername(q.username);
  const certificate: RepositoryCertificate = {
    repositoryName: q.name,
    user: {
      login: q.username,
      name: officer?.fullName || `@${q.username}`,
      url: `https://github.com/${q.username}`,
      bio: userData.user.bioHTML,
      picture: officer?.picture ? `/people/${officer.picture}` : userData.user.avatarUrl,
    },
    merged: prs,
  };

  // Return the page data.
  return { certificate };
}
