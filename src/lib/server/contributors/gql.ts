export interface InitialQueryResult {
  repositoryOwner: {
    id: string;
  };
  repository: {
    discussions: {
      nodes: {
        title: string;
        number: number;
      }[];
    }
    releases: {
      nodes: {
        tagName: string;
        createdAt: string;
        url: string;
        descriptionHTML: string;
      }[];
    };
  };
}

/**
 * GraphQL query to get the GitHub user ID and latest releases data.
 * @see https://docs.github.com/en/graphql/overview/explorer
 */
export function makeInitialQuery(login: string, categoryID: string) {
  return `{
    repositoryOwner(login: "${login}") {
      id
    }

    repository(owner: "ethanthatonekid", name: "acmcsuf.com") {
      releases {
        nodes {
          tagName
          createdAt
          url
          descriptionHTML
        }
      }

      discussions(first: 100, categoryId: "${categoryID}", login: "${login}") {
        nodes {
          title
          number
        }
      }
    }
  }`;
}

export interface SecondaryQueryResult {
  user: {
    name: string;
    login: string;
    avatarUrl: string;
    bio: string;
    url: string;
  };
  repository: {
    defaultBranchRef: {
      name: string;
      target: {
        history: {
          nodes: {
            url: string;
            committedDate: string;
            messageHeadlineHTML: string;
            associatedPullRequests: {
              edges: {
                node: {
                  url: string;
                  number: number;
                  closedAt: string;
                };
              }[];
            };
          }[];
        };
      };
    };
  };
}

/**
 * GraphQL query to get the commits of a user between two dates on the default branch.
 * @see https://docs.github.com/en/graphql/overview/explorer
 */
export function makeSecondaryQuery(authorID: string, startDate: string, endDate: string) {
  return `{
    user(login: "ethanthatonekid") {
      name
      login
      avatarUrl
      bio
      url
    }

    repository(owner: "ethanthatonekid", name: "acmcsuf.com") {
      defaultBranchRef {
          name
          target {
            ... on Commit {
              history(author: { id: "${authorID}" }, since: "${endDate}", after: "${startDate}") {
                nodes {
                  url
                  committedDate
                  messageHeadlineHTML
                  associatedPullRequests {
                    edges {
                      node {
                        url
                        number
                        closedAt
                      }
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
