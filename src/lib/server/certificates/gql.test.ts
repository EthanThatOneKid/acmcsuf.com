import { test, expect } from 'vitest';
import { makePRsQuery, makeReleasesQuery } from './gql';

const TEST_OWNER = 'OWNER';
const TEST_REPO_NAME = 'REPO_NAME';
const TEST_USERNAME = 'USERNAME';
const TEST_INDEX = 0;
const TEST_RELEASE_DATA = {
  repository: {
    releases: {
      edges: [
        {
          node: {
            name: 'v2.0.0',
            createdAt: '2022-01-01T00:00:00Z',
          },
        },
        {
          node: {
            name: 'v1.0.0',
            createdAt: '2021-01-01T00:00:00Z',
          },
        },
      ],
    },
  },
};

test('makeReleasesQuery', () => {
  const query = makeReleasesQuery({ owner: TEST_OWNER, name: TEST_REPO_NAME });
  expect(query).toEqual(`{
  repository(owner: "${TEST_OWNER}", name: "${TEST_REPO_NAME}") {
    releases(last: 100) {
      edges {
        node {
          name
          createdAt
        }
      }
    }
  }
}`);
});

test('makePRsQuery', () => {
  const query = makePRsQuery({
    releaseData: TEST_RELEASE_DATA,
    owner: TEST_OWNER,
    name: TEST_REPO_NAME,
    username: TEST_USERNAME,
    index: TEST_INDEX,
  });
  expect(query).toEqual(`{
  repository(owner: "${TEST_OWNER}", name: "${TEST_REPO_NAME}") {
    pullRequests(author: "${TEST_USERNAME}", first: 100, states: MERGED, after: "${TEST_RELEASE_DATA.repository.releases.edges[1].node.createdAt}", before: "${TEST_RELEASE_DATA.repository.releases.edges[0].node.createdAt}") {
      edges {
        node {
          createdAt
          mergedAt
          title
          author {
            login
            url
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}`);
});
