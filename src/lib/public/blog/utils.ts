import type { BlogFetchOptions } from './types';

interface WithLabels {
  labels: string[];
}

export function discernLabels(posts: WithLabels[]): string[] {
  const labels = new Set<string>([]);
  for (const post of posts) {
    post.labels.forEach((label) => labels.add(label));
  }
  return Array.from(labels).sort();
}

/**
 * Takes a string input (either html or plaintext) and calculates the time
 * (in minutes) to read a blog post, By default it uses 225 (the average adult
 * reading time based on a quick Google search), but may be overridden
 * with the `wpm` parameter.
 * @param blogContent The string containing the blog text
 * @param wpm (Optional) defines words per minute to assume the reader reads at
 * @returns The estimated read time of an article in minutes
 */
export function readingTime(blogContent: string, wpm = 225) {
  // Regex taken from https://stackoverflow.com/a/5002161 to parse out HTML tags
  const text = blogContent.replace(/<\/?[^>]+(>|$)/, '').trim();
  return Math.ceil(text.split(/\s+/).length / wpm);
}

export const ALL = 'all';

export function parseQuery(query: string): BlogFetchOptions {
  if (query === ALL) return { labels: [] };

  if (Number.isInteger(+query)) {
    return { labels: [], id: Math.abs(+query) };
  }

  return { labels: query.split(';') };
}
