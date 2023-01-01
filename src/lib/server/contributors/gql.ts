export interface InitialQueryResult {
  data: {
    repositoryOwner: {
      id: string;
    };
    repository: {
      discussions: {
        nodes: {
          title: string;
          number: number;
          author: { login: string };
          createdAt: string;
        }[];
      };
      releases: {
        nodes: {
          tagName: string;
          createdAt: string;
          url: string;
          descriptionHTML: string;
        }[];
      };
    };
  };
}

/**
 * GraphQL query to get the GitHub user ID and latest releases data.
 * The purpose of the initial query is to fetch any data that is needed
 * to construct the secondary query.
 * @see https://docs.github.com/en/graphql/overview/explorer
 */
export function makeInitialQuery(login: string, categoryID: string) {
  return `{
    repositoryOwner(login: "${login}") {
      id
    }
    repository(owner: "ethanthatonekid", name: "acmcsuf.com") {
      releases(last: 100) {
        nodes {
          tagName
          createdAt
          url
          descriptionHTML
        }
      }
      discussions(last: 100, categoryId: "${categoryID}") {
        nodes {
          title
          number
          author {
            login
          }
          createdAt
        }
      }
    }
  }`;
}

export interface SecondaryQueryResult {
  data: {
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
  };
}

/**
 * GraphQL query to get the commits of a user between two dates on the default branch.
 * @see https://docs.github.com/en/graphql/overview/explorer
 */
export function makeSecondaryQuery(
  login: string,
  authorID: string,
  startDate: string,
  endDate: string
) {
  return `{
    user(login: "${login}") {
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
            history(
              author: {id: "${authorID}"}
              since: "${startDate}"
              until: "${endDate}"
            ) {
              nodes {
                url
                committedDate
                messageHeadlineHTML
                associatedPullRequests(first: 100) {
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
