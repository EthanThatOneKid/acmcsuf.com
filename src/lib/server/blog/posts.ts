import * as cheerio from 'cheerio';

import type { BlogFetchOptions, BlogOutput, BlogPost } from '$lib/public/blog/types';
import { discernLabels } from '$lib/public/blog/utils';
import { OFFICERS } from '$lib/public/board/data';
import type { Officer } from '$lib/public/board/types';
import { GH_ACCESS_TOKEN, GH_DISCUSSION_CATEGORY_ID } from '$lib/server/env';
import { DEBUG_FLAG_ENABLED } from '$lib/server/flags';
import { BlogPostsCache } from './cache';
import { SAMPLE_BLOG_POSTS } from './data';
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

    allPosts = cacheBlogPosts(await response.json());

    // Iterate over all blog posts, applying any post processing steps defined
    // in postProcessHTML()
    for (const post of allPosts) {
      post.html = postProcessHTML(post.html);
    }
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
function cacheBlogPosts(output: any): BlogPost[] {
  const discussions = output.data.repository.discussions.nodes;

  /**
   * No types exist for the discussion object, as the structure is generated
   * based on the GraphQL {@link gql}.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = discussions.map((discussion: any): BlogPost => {
    const {
      title,
      author,
      createdAt,
      lastEditedAt: lastEdited,
      number: id,
      bodyHTML: html,
      bodyText,
      url: discussionUrl,
    } = discussion;

    const url = `/blog/${id}`;
    const officer = getOfficerByGhUsername(author.login);
    const authorUrl = author.url;
    const displayname = author.login;
    const fullname = officer?.fullName;
    const picture: string =
      author.avatarUrl ?? `/assets/authors/${officer?.picture || 'placeholder.webp'}`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const labels = discussion.labels.nodes.map(({ name }: any) => name);

    const post = {
      id,
      url,
      discussionUrl,
      title,
      html,
      bodyText,
      createdAt,
      lastEdited,
      labels,
      author: { url: authorUrl, displayname, fullname, picture },
    };

    return post;
  });

  cache.setAllPosts(posts);

  return posts;
}

export function getOfficerByGhUsername(ghUsername: string): Officer | null {
  // get author by GitHub username
  const officer = OFFICERS.find(
    (o) =>
      o.socials && o.socials.github && o.socials.github.toLowerCase() === ghUsername.toLowerCase()
  );
  return officer ?? null;
}

/**
 * Performs the following post-processing steps on the HTML content of a
 * blog post
 * 1. Removes the "disabled" attribute from any checkboxes in the document
 * 2. Wraps all .task-list-item contents to make them css selectable
 * @param html The HTML content of the blog post
 * @returns The modified HTML string
 */
function postProcessHTML(html: string) {
  const $ = cheerio.load(html, { xmlMode: true });
  // remove disabled attribute from checkboxes
  $('input[type=checkbox]').removeAttr('disabled');

  // wrap elements in spans to make them css selectable
  $('li.task-list-item').contents().not('input[type=checkbox]').wrap('<span></span>');

  return $.html();
}

if (import.meta.vitest) {
  const { describe, expect, test } = import.meta.vitest;

  describe('HTML post processing', () => {
    test('removes disabled from checkboxes', () => {
      // Test various formats for the disabled property
      // '<input type="checkbox" disabled=""/>
      expect(postProcessHTML('<input type="checkbox" id="a" disabled="" class="asdf">')).toBe(
        '<input type="checkbox" id="a" class="asdf"/>'
      );

      // '<input type="checkbox" disabled = ""/>
      expect(postProcessHTML('<input type="checkbox" id="a" disabled = "" class="asdf">')).toBe(
        '<input type="checkbox" id="a" class="asdf"/>'
      );

      // '<input type="checkbox" disabled/>
      expect(postProcessHTML('<input type="checkbox" id="a" disabled class="asdf">')).toBe(
        '<input type="checkbox" id="a" class="asdf"/>'
      );

      // Make sure it only applies to checkboxes
      expect(postProcessHTML('<input id="a" disabled="" class="asdf">')).toBe(
        '<input id="a" disabled="" class="asdf"/>'
      );
    });
    test('properly wraps task-list-items in spans', () => {
      expect(
        postProcessHTML(
          `<li class="task-list-item"><input type="checkbox" id="" class="asdf" />Lorem <a>ipsum</a> dolor</li>`
        )
      ).toBe(
        `<li class="task-list-item"><input type="checkbox" id="" class="asdf"/><span>Lorem </span><span><a>ipsum</a></span><span> dolor</span></li>`
      );
    });
  });
}
