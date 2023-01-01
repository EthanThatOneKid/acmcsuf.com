import type { Contributor, Release } from '$lib/public/contributors';
import { GH_ACCESS_TOKEN, GH_DISCUSSION_CATEGORY_ID } from '$lib/server/env';
import { getOfficerByGhUsername } from '$lib/server/blog/posts';
import { makeBlogPostPageUrl } from '$lib/public/blog/urls';

import type { InitialQueryResult, SecondaryQueryResult } from './gql';
import { makeInitialQuery, makeSecondaryQuery } from './gql';
import { cachedContributors, makeCacheKey } from './cache';

interface ContributorFetchOptions {
  login: string;
  version: string;
}

const GRAPHQL_URL = 'https://api.github.com/graphql';

export const LATEST = 'latest';

export async function fetchContributor({
  login,
  version,
}: ContributorFetchOptions): Promise<Contributor | undefined> {
  let allContributors = cachedContributors.get();
  let contributor = allContributors?.get(makeCacheKey({ login, version }));
  if (contributor) {
    return contributor;
  }

  const { data: initialQueryResult } = await doQuery<InitialQueryResult>(
    makeInitialQuery(login, GH_DISCUSSION_CATEGORY_ID)
  );
  const uid = initialQueryResult.repositoryOwner.id;
  if (!uid) {
    return undefined;
  }

  const releases = initialQueryResult.repository.releases.nodes.map(
    (r): Release => ({
      version: r.tagName,
      date: r.createdAt,
      url: r.url,
      description: r.descriptionHTML,
    })
  );

  const [prevRelease, currRelease] = getInterval(releases, version);

  // TODO: Go beyond 100 contributions via pagination via `after` in conjunction with
  // pageInfo { hasNextPage endCursor }.
  const hasNextPage = true;
  while (hasNextPage) {
    const { data: secondaryQueryResult } = await doQuery<SecondaryQueryResult>(
      makeSecondaryQuery(login, uid, prevRelease.date, currRelease.date)
    );

    const startDate = new Date(prevRelease.date);
    const endDate = new Date(currRelease.date);
    const loweredLogin = login.toLowerCase();
    const officer = getOfficerByGhUsername(loweredLogin);

    contributor ??= {
      name: secondaryQueryResult.user.name,
      login: secondaryQueryResult.user.login,
      picture: officer?.picture || secondaryQueryResult.user.avatarUrl,
      bio: secondaryQueryResult.user.bio,
      url: secondaryQueryResult.user.url,
      contributions: [],
      posts: initialQueryResult.repository.discussions.nodes
        .filter((d) => {
          return (
            dateBetween(new Date(d.createdAt), startDate, endDate) &&
            d.author.login.toLowerCase() === loweredLogin
          );
        })
        .map((d) => ({
          url: makeBlogPostPageUrl(d.number),
          title: d.title,
        })),
      from: prevRelease.version,
      to: currRelease.version,
    };

    contributor.contributions.push(
      ...secondaryQueryResult.repository.defaultBranchRef.target.history.nodes.map((c) => ({
        url: c.url,
        message: c.messageHeadlineHTML,
        associatedPRs: c.associatedPullRequests.edges.map((e) => ({
          url: e.node.url,
          number: e.node.number,
          closedAt: e.node.closedAt,
        })),
      }))
    );
  }

  allContributors ??= new Map<string, Contributor>();

  if (contributor) {
    allContributors.set(makeCacheKey({ login, version }), contributor);
    cachedContributors.set(allContributors);
  }

  return contributor;
}

async function doQuery<T>(query: string): Promise<T> {
  const r = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { Authorization: `token ${GH_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return (await r.json()) as T;
}

function getInterval(releases: Release[], version: string): [Release, Release] {
  if (version === 'latest') {
    return [releases[1], releases[0]];
  }

  const i = releases.findIndex((r) => r.version === version);
  if (i > 0) {
    return [releases[i], releases[i - 1]];
  }

  return [releases[1], releases[0]];
}

function dateBetween(candidate: Date, startDate: Date, endDate: Date): boolean {
  return candidate > startDate && candidate <= endDate;
}
