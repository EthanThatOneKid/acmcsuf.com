import { DEBUG_FLAG_ENABLED, GH_ACCESS_TOKEN, GH_DISCUSSION_CATEGORY_ID } from '$lib/server/env';
import type { BlogFetchOptions, BlogOutput, BlogPost } from '$lib/public/blog/types';
import { discernLabels } from '$lib/public/blog/utils';
import type { Officer } from '$lib/public/board/types';
import { OFFICERS } from '$lib/public/board/data';
import { SAMPLE_BLOG_POSTS } from './data';
import { query } from './query';

export async function fetchBlogPosts(options?: BlogFetchOptions): Promise<BlogOutput> {
  // By default, set posts to default sample data.
  let allPosts: BlogPost[] = [...SAMPLE_BLOG_POSTS];

  // If debug mode is disabled, fetch the real data.
  if (!DEBUG_FLAG_ENABLED) {
    allPosts = [];

    // Uses sample data when DEBUG = 1 or env variables are not satisfied.
    if (!GH_ACCESS_TOKEN || !GH_DISCUSSION_CATEGORY_ID) {
      return { posts: [], labels: [] };
    }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `token ${GH_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query(GH_DISCUSSION_CATEGORY_ID) }),
    });

    allPosts = formatBlogPosts(await response.json());
  }

  // These labels are always derived from **all** the published posts.
  const labels = discernLabels(allPosts);

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
function formatBlogPosts(output: any): BlogPost[] {
  const discussions = output.data.repository.discussions.nodes;

  /**
   * No types exist for the discussion object, as the structure is generated
   * based on the GraphQL {@link newslettersQuery}.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return discussions.map((discussion: any): BlogPost => {
    const {
      title,
      author,
      createdAt,
      lastEditedAt: lastEdited,
      number: id,
      bodyHTML: html,
      url: discussionUrl,
    } = discussion;

    const url = '/blog/' + id;
    const officer = getOfficerByGhUsername(author.login);
    const authorUrl: string = author.url;
    const displayname: string = officer?.fullName ?? author.login;
    const picture: string = officer?.picture ?? author.avatarUrl;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const labels = discussion.labels.nodes.map(({ name }: any) => name);

    return {
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
  });
}

function getOfficerByGhUsername(ghUsername: string): Officer | null {
  // get author by GitHub username
  const officer = OFFICERS.find((o) => o.displayName !== undefined && o.displayName === ghUsername);
  return officer ?? null;
}
