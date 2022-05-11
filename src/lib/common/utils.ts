export function discernTags(posts: { labels: string[] }[]): string[] {
  const tags = posts.map((post) => post.labels).flat();
  return tags.sort();
}
