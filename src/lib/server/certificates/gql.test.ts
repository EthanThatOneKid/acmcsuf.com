import { expect, test } from "vitest";

import type { ReleasesResponse } from "./gql";
import { makePRsQuery, makeReleasesQuery } from "./gql";

const TEST_OWNER = "OWNER";
const TEST_REPO_NAME = "REPO_NAME";
const TEST_USERNAME = "USERNAME";
const TEST_RELEASE_DATA: ReleasesResponse = {
  repository: {
    releases: {
      edges: [
        {
          node: {
            tagName: "v2.0.0",
            name: "v2.0.0",
            createdAt: "2022-01-01T00:00:00Z",
          },
        },
        {
          node: {
            name: "v1.0.0",
            tagName: "v1.0.0",
            createdAt: "2021-01-01T00:00:00Z",
          },
        },
      ],
    },
  },
  user: {
    name: "TEST_RELEASE_USER_NAME",
    bioHTML: "TEST_RELEASE_USER_BIO",
    avatarUrl: "TEST_RELEASE_USER_AVATAR_URL",
  },
};

test("makeReleasesQuery", () => {
  const query = makeReleasesQuery({
    owner: TEST_OWNER,
    name: TEST_REPO_NAME,
    username: TEST_USERNAME,
  });
  expect(query).toEqual(`{
  repository(owner: "OWNER", name: "REPO_NAME") {
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
  user(login: "USERNAME") {
    name
    bioHTML
    avatarUrl
  }
}`);
});

test("makePRsQuery", () => {
  const query = makePRsQuery({
    owner: TEST_OWNER,
    name: TEST_REPO_NAME,
    username: TEST_USERNAME,
    startDate: TEST_RELEASE_DATA.repository.releases.edges[1].node.createdAt,
    endDate: TEST_RELEASE_DATA.repository.releases.edges[0].node.createdAt,
  });
  expect(query).toEqual(`{
  search(
    type: ISSUE
    query: "repo:OWNER/REPO_NAME is:pr is:public base:main author:USERNAME sort:created-asc merged:2021-01-01T00:00:00Z..2022-01-01T00:00:00Z"
    first: 25
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
}`);
});
