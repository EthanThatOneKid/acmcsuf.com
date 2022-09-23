import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import type { RouteParams } from './$types';
import { convert as convertHtml2Txt } from 'html-to-text';
import type { BlogPost } from '$lib/public/blog/types';

export async function GET({ params, url }: RequestEvent<RouteParams>) {
  // TODO: Rename directory to [id=integer] <https://kit.svelte.dev/docs/advanced-routing#matching>
  if (!params.id || !Number.isInteger(+params.id)) {
    throw error(404, 'Not found');
  }

  const target = new URL(`/blog/${params.id}.json`, url.origin);
  const response = await fetch(target.toString());
  const blogOutput = await response.json();

  const post = ((blogOutput.posts ?? []) as BlogPost[]).shift();

  if (!post) {
    throw error(404, 'Not found');
  }

  return new Response(serializePost(post), {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}

function serializePost(post: BlogPost) {
  const lines: string[] = [];

  // Top of file is where blog metadata is displayed as YAML front matter
  /*********** [[[ METADATA START ]]] ***********/
  lines.push('---');

  const txtTitle = convertHtml2Txt(post.title);
  lines.push(`title: ${txtTitle}`);

  lines.push(`id: ${post.id}`);
  lines.push(`html_url: "https://acmcsuf.com${post.url}"`);
  lines.push(`discussion_url: "${post.discussionUrl}"`);

  const author =
    post.author.displayname + (post.author.url !== undefined ? ` (${post.author.url})` : '');
  lines.push(`author: "${author}"`);

  const labels = post.labels.map((l) => `"${l}"`).join(', ');
  lines.push(`labels: [${labels}]`);

  lines.push(`created: "${new Date(post.createdAt).toISOString()}"`);

  if (post.lastEdited) {
    lines.push(`edited: "${new Date(post.lastEdited).toISOString()}"`);
  }

  lines.push('---');
  /*********** [[[ METADATA END ]]] ***********/

  // Add title with padding
  lines.push('');
  lines.push(txtTitle);
  lines.push('='.repeat(txtTitle.length));
  lines.push('');

  // Add blog content
  return lines.concat(convertHtml2Txt(post.html, { wordwrap: 100 })).join('\n');
}
