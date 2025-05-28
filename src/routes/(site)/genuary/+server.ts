import type { RequestEvent } from '@sveltejs/kit';

/**
 * The server-side load function for Genuary.
 *
 * Redirects to the latest year on file.
 */
export async function GET({ url }: RequestEvent) {
  const years = await import.meta.glob('./*/+page.svelte?raw', {
    eager: true,
  });
  const latest = findLatest(Object.keys(years).map(fromKey));
  const destination = new URL(`/genuary/${latest}`, url);
  return Response.redirect(destination, 302);
}

/** Example: key === "./2023/+page.svelte" */
function fromKey(key: string): number {
  const match = key.match(/\/(\d{4})\//);
  if (!match) {
    return -Infinity;
  }
  return Number(match[1]);
}

function findLatest(items: number[]): number {
  const found = items.sort((a, b) => a - b).pop();
  if (found === undefined) {
    return EARLIEST;
  }

  return found;
}

const EARLIEST = 2023;
