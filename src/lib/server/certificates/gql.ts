/**
 * RepoQuery is an interface for a repository query object with the repository owner and name.
 */
export interface RepoQuery {
  /**
   * owner is the owner of the repository.
   */
  owner: string;

  /**
   * name is name of the repository.
   */
  name: string;

  /**
   * username is the username of the queried user.
   */
  username: string;
}

// GitHub GraphQL Explorer:
// https://docs.github.com/en/graphql/overview/explorer

export function makeUserQuery(username: string): string {
  return `{
  user(login: "${username}") {
    name
    bioHTML
    avatarUrl
  }
}`;
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
  user(login: "${q.username}") {
    name
    bioHTML
    avatarUrl
  }
}`;

  return query;
}

/**
 * An interface for a PRs query object with the repository owner, name, username, and shared query options.
 */
export interface PRsQuery extends RepoQuery {
  /** The username of the queried user. */
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
export interface ReleaseCertificateQuery extends RepoQuery {
  /** The username of the user. */
  username: string;

  /**
   * The index of the release to start from. If the value is a string, it will be used
   * to match the release name.
   */
  release: number | string;

  /**
   * maxPageSize is the maximum amount of PRs to fetch per page. This is a limitation of GitHub's API.
   */
  maxPageSize?: number;
}

/**
 * RepositoryCertificateQuery is an interface for a repository certificate query object with the repository owner and name.
 */
export interface RepositoryCertificateQuery extends RepoQuery {
  /**
   * startDate is the start date for the query. */
  startDate?: string;

  /**
   * endDate is the end date for the query.
   */
  endDate?: string;

  /**
   * maxPageSize is the maximum amount of PRs to fetch per page. This is a limitation of GitHub's API.
   */
  maxPageSize?: number;
}

// A function to generate a GraphQL query to fetch a page of merged pull requests.
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
    'is:public',
    `base:main`,
    `author:${username}`,
    'sort:created-asc',
    startDate ? `merged:${startDate}..${endDate}` : `merged:<=${endDate}`,
  ].join(' ');
  const cursorDef = cursor
    ? `
  after: "${cursor}"`
    : '';

  return `{
  search(
    type: ISSUE
    query: "${searchQuery}"
    first: ${maxPageSize}${cursorDef}
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

export interface IssuesQuery extends RepoQuery {
  /** The start date for the query. */
  startDate?: string;

  /** The end date for the query. */
  endDate: string;

  /** The cursor for pagination. */
  cursor?: string;

  /** The maximum page size (default is 100). */
  maxPageSize?: number;
}

// A function to generate a GraphQL query to fetch a page of issues.
export function makeIssuesQuery({
  username,
  owner,
  name,
  startDate,
  endDate,
  cursor,
  maxPageSize = 25,
}: IssuesQuery): string {
  /**
   * @see https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax
   */
  const searchQuery = [
    `repo:${owner}/${name}`,
    'is:issue',
    'is:public',
    `author:${username}`,
    'sort:created-asc',
    startDate ? `created:${startDate}..${endDate}` : `created:<=${endDate}`,
  ].join(' ');
  const cursorDef = cursor
    ? `
  after: "${cursor}"`
    : '';

  return `{
  search(
    type: ISSUE
    query: "${searchQuery}"
    first: ${maxPageSize}${cursorDef}
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ... on Issue {
          number
          title
          url
          createdAt
        }
      }
    }
  }
}`;
}

export interface IssuesResponse {
  search: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
    edges: { node: IssueNode }[];
  };
}

export interface IssueNode {
  number: number;
  title: string;
  url: string;
  createdAt: string;
}

/**
 * UserResponse is an interface for the response data for the user query.
 */
export interface UserResponse {
  user: {
    name: string;
    bioHTML: string;
    avatarUrl: string;
  };
}

/*
 * ReleasesResponse is an interface for the response data for the releases query.
 */
export interface ReleasesResponse extends UserResponse {
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
