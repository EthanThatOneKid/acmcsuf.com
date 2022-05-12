interface WithLabels {
  labels: string[];
}

export function discernTags(posts: WithLabels[]): string[] {
  const tags = new Set([]);
  for (const post of posts) {
    post.labels.forEach((label) => tags.add(label));
  }
  return Array.from(tags).sort();
}
