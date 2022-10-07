import { GH_ACCESS_TOKEN, GH_DISCUSSION_CATEGORY_ID } from '$lib/server/env';
import { DEBUG_FLAG_ENABLED } from '$lib/server/flags';
import type { BlogFetchOptions, BlogOutput, BlogPost } from '$lib/public/blog/types';
import { discernLabels } from '$lib/public/blog/utils';
import type { Officer } from '$lib/public/board/types';
import { OFFICERS } from '$lib/public/board/data';
import { SAMPLE_BLOG_POSTS } from './data';
import { BlogPostsCache } from './cache';
import { gql } from './gql';

const API_URL = 'https://api.github.com/graphql';

// Make this false to disable server-side caching in development.
const cache = BlogPostsCache.create(/* CACHING=*/ true);

export async function fetchBlogPosts(options?: BlogFetchOptions): Promise<BlogOutput> {
  // By default, set posts to default sample data.
  let allPosts: BlogPost[] = [...SAMPLE_BLOG_POSTS];

  const cachedPosts = cache.getAllPosts();

  if (!DEBUG_FLAG_ENABLED && cachedPosts) {
    allPosts = cachedPosts;
  }

  // If debug mode is disabled, fetch the real data.
  if (!DEBUG_FLAG_ENABLED && !cachedPosts) {
    // Uses sample data when DEBUG = 1 or env variables are not satisfied.
    if (!GH_ACCESS_TOKEN || !GH_DISCUSSION_CATEGORY_ID) {
      return { posts: [], labels: [] };
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { Authorization: `token ${GH_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: gql(GH_DISCUSSION_CATEGORY_ID) }),
    });

    allPosts = await cacheBlogPosts(await response.json());
  }

  // These labels are always derived from **all** the published posts.
  const labels = discernLabels(allPosts);

  if (options?.id) {
    return { labels, posts: allPosts.filter((p) => p.id === options.id) };
  }

  // If no options are provided, return all posts.
  // Otherwise, return only posts with the specified labels.
  const filteredPosts =
    options && options.labels.length > 0
      ? allPosts.filter((post) => post.labels.some((item) => options.labels.includes(item)))
      : allPosts;

  const sortedPosts = filteredPosts.sort((a, b) => {
    return new Date(b.createdAt ?? 0).valueOf() - new Date(a.createdAt ?? 0).valueOf();
  });

  return { labels, posts: sortedPosts };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function cacheBlogPosts(output: any): Promise<BlogPost[]> {
  const discussions = output.data.repository.discussions.nodes;

  /**
   * No types exist for the discussion object, as the structure is generated
   * based on the GraphQL {@link gql}.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = await Promise.all(discussions.map(async (discussion: any): Promise<BlogPost> => {
    const {
      title,
      author,
      createdAt,
      lastEditedAt: lastEdited,
      number: id,
      bodyHTML: html,
      url: discussionUrl,
    } = discussion;

    const url = `/blog/${id}`;
    const authorUrl: string = author.url;
    const displayname: string = await tryGetGhFullName(author.login);
    const picture: string = author.avatarUrl;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const labels = discussion.labels.nodes.map(({ name }: any) => name);

    const post = {
      id,
      url,
      discussionUrl,
      title,
      html,
      createdAt,
      lastEdited,
      labels,
      author: { url: authorUrl, displayname, picture },
    };

    return post;
  }));

  cache.setAllPosts(posts);

  return posts;
}

function getOfficerByGhUsername(ghUsername: string): Officer | null {
  // get author by GitHub username
  const officer = OFFICERS.find((o) => o.displayName !== undefined && o.displayName === ghUsername);
  return officer ?? null;
}

async function tryGetGhFullName(login: string): Promise<string> {
  try {
    const result: Response = await fetch(`https://api.github.com/users/${login}`,
      {
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${GH_ACCESS_TOKEN}`
        })
      });

    const body = await result.json();

    return body?.name ?? login;
  } catch (error) {
    console.error(`Could not retrieve author name: ${error}`);
    return login;
  }
}