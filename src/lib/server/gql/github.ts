import { GH_ACCESS_TOKEN } from "$lib/server/env";

const GRAPHQL_URL = "https://api.github.com/graphql";

export async function doQuery<T>(query: string): Promise<T> {
  const r = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `token ${GH_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  return (await r.json())["data"] as T;
}
