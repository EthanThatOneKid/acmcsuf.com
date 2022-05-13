interface WithLabels {
  labels: string[];
}

export function discernLabels(posts: WithLabels[]): string[] {
  const labels = new Set([]);
  for (const post of posts) {
    post.labels.forEach((label) => labels.add(label));
  }
  return Array.from(labels).sort();
}
