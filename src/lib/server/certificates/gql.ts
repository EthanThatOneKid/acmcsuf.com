/**
 * RepoQuery is an interface for a repository query object with the repository owner and name.
 */
export interface RepoQuery {
  /** The owner of the repository. */
  owner: string;
  /** The name of the repository. */
  name: string;
}

// A function to generate a GraphQL query to fetch a page of releases
export function makeReleasesQuery(q: RepoQuery): string {
  const query = `{
  repository(owner: "${q.owner}", name: "${q.name}") {
    releases(last: 100) {
      edges {
        node {
          name
          createdAt
          tagName
        }
      }
    }
  }
}`;

  return query;
}

/**
 * An interface for a PRs query object with the repository owner, name, username, and shared query options.
 */
export interface PRsQuery extends RepoQuery {
  /** The username of the user. */
  username: string;

  /** The start date for the query. */
  startDate?: string;

  /** The end date for the query. */
  endDate: string;

  /** The cursor for pagination. */
  cursor?: string;

  /** The maximum page size (default is 100). */
  maxPageSize?: number;
}

/**
 * An interface to query a certificate.
 */
export interface CertificateQuery extends RepoQuery {
  /** The username of the user. */
  username: string;

  /**
   * The index of the release to start from. If the value is a string, it will be used
   * to match the release name.
   */
  release: number | string;

  /** The maximum page size (default is 100). */
  maxPageSize?: number;
}

// A function to generate a GraphQL query to fetch a page of merged pull requests
export function makePRsQuery({
  username,
  owner,
  name,
  startDate,
  endDate,
  cursor,
  maxPageSize = 25,
}: PRsQuery): string {
  /**
   * @see https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax
   */
  const searchQuery = [
    `repo:${owner}/${name}`,
    'is:pr',
    'is:closed',
    'is:public',
    'archived:false',
    `base:main`,
    `author:${username}`,
    'sort:created-asc',
    startDate ? `merged:${startDate}..${endDate}` : `merged:<=${endDate}`,
  ].join(' ');

  return `{
  search(
    type: ISSUE
    query: "${searchQuery}"
    first: ${maxPageSize}
    ${cursor ? `after: "${cursor}"` : ''}
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ... on PullRequest {
          number
          title
          mergedAt
          url
          commits(first: 100) {
            edges {
              node {
                commit {
                  message
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}`;
}

// An interface for the response data for the pull requests query
export interface PRsResponse {
  search: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: { node: PRNode }[];
  };
}

export interface PRNode {
  number: number;
  title: string;
  mergedAt: string;
  url: string;
  commits: {
    edges: { node: CommitNode }[];
  };
}

export interface CommitNode {
  commit: {
    message: string;
    url: string;
  };
}

// An interface for the response data for the releases query
export interface ReleasesResponse {
  repository: {
    releases: {
      edges: { node: ReleaseNode }[];
    };
  };
}

export interface ReleaseNode {
  name: string;
  createdAt: string;
  tagName: string;
}
