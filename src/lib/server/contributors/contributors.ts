import type { Contribution, Contributor, Release } from '$lib/public/contributors';
import { GH_ACCESS_TOKEN,GH_DISCUSSION_CATEGORY_ID } from '$lib/server/env';
import { getOfficerByGhUsername} from "$lib/server/blog/posts"
import { makeBlogPostPageUrl } from '$lib/public/blog/urls';

import type { InitialQueryResult, SecondaryQueryResult } from './gql';
import { makeInitialQuery, makeSecondaryQuery } from './gql';
import { cachedContributors , makeCacheKey} from './cache';

interface ContributorFetchOptions {
  login: string;
  version: string;
}

const GRAPHQL_URL = 'https://api.github.com/graphql';

export async function fetchContributor(
  {
    login,
    version = "latest"}: ContributorFetchOptions
): Promise<Contributor | undefined> {
  let allContributors = cachedContributors.get();
  let contributor = allContributors?.get(makeCacheKey({ login, version }));
  if (contributor) {
    return contributor;
  }

  const initialQueryResult = await doQuery<InitialQueryResult>(makeInitialQuery(login, GH_DISCUSSION_CATEGORY_ID));
  const uid = initialQueryResult.repositoryOwner.id;
  if (!uid) {
    return undefined;
  }

    const releases = initialQueryResult.repository.releases.nodes.map((r): Release => ({
    version: r.tagName,
    date: r.createdAt,
    url: r.url,
    description: r.descriptionHTML,
  }));

  const [startDate, endDate] = getInterval(releases, version);
  const secondaryQueryResult = await doQuery<SecondaryQueryResult>(makeSecondaryQuery(uid, startDate, endDate));
  
    const officer = getOfficerByGhUsername(login);
  
    contributor = {
      name: secondaryQueryResult.user.name,
      login: secondaryQueryResult.user.login,
      picture: officer?.picture || 
       secondaryQueryResult.user.avatarUrl,
      bio: secondaryQueryResult.user.bio,
      url: secondaryQueryResult.user.url,
      contributions: secondaryQueryResult.repository.defaultBranchRef.target.history.nodes.map((c) => ({
        url: c.url,
        message: c.messageHeadlineHTML,
        associatedPRURL: c.associatedPullRequests.edges[0]?.node.url,
        timestamp: c.committedDate,
        closedAt: c.associatedPullRequests.edges[0]?.node.closedAt,
        })),
      posts: initialQueryResult.repository.discussions.nodes.map((d) => ({
        url: makeBlogPostPageUrl(d.number),
        title: d.title,
      }))
    };

allContributors ??= new Map<string, Contributor>();
  allContributors.set(makeCacheKey({ login, version }), contributor);
  cachedContributors.set(allContributors);

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

function getInterval(releases: Release[], version: string): [string, string] {
  if (version === 'latest') {
    return [releases[1].date, releases[0].date];
  }

  const i =  releases.findIndex((r) => r.version === version);
  if (i > 0) {
    return [releases[i].date, releases[i - 1].date];
  }

  return [releases[1].date, releases[0].date];
}
