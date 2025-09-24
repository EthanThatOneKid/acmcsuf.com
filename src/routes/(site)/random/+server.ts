import type { RequestEvent } from '@sveltejs/kit';

/**
 * The server-side load function for https://acmcsuf.com/random.
 */
export async function GET({ url }: RequestEvent) {
  const modules = Object.keys(await import.meta.glob('../**/+page.svelte?raw', { eager: true }));
  const pages = getPages(modules);
  const randomPage = pages[~~(Math.random() * pages.length)];
  const destination = new URL(randomPage, url);
  return Response.redirect(destination, 302);
}

/**
 * getPages gets the SvelteKit pages given a list of module names.
 *
 * Reference:
 * - https://github.com/sveltejs/kit/issues/923#issuecomment-1567052262
 */
function getPages(modules: string[]): string[] {
  return modules.map(toPathname).filter((pathname) => pathname !== null) as string[];
}

function toPathname(input: string): string | null {
  // Removes dynamic pages that cannot be dynamically retrieved at random.
  // Check for [ and ] symbols in the input string and return null if found
  if (input.includes('[') || input.includes(']')) {
    return null;
  }

  // Deconstruct the pathname parts.
  const parts = input.split('/').filter((part) => !!part && part !== '.' && part !== '..');

  // Reconstruct the pathname while ignoring last part.
  const pathname = parts.slice(0, parts.length - 1).join('/');
  return `/${pathname}`;
}
