import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit/types/internal';
import { convert as convertHtml2Txt } from 'html-to-text';
import type { Newsletter } from './_query';

function serializeNewsletter(newsletter: Newsletter) {
  const lines: string[] = [];

  // Top of file is where blog metadata is displayed as YAML front matter
  /*********** [[[ METADATA START ]]] ***********/
  lines.push('---');

  const txtTitle = convertHtml2Txt(newsletter.title);
  lines.push(`title: ${txtTitle}`);

  lines.push(`id: ${newsletter.id}`);
  lines.push(`html_url: "https://acmcsuf.com${newsletter.url}"`);
  lines.push(`discussion_url: "${newsletter.discussionUrl}"`);

  const author =
    newsletter.author.displayname +
    (newsletter.author.url !== undefined ? ` (${newsletter.author.url})` : '');
  lines.push(`author: "${author}"`);

  const labels = newsletter.labels.map((l) => `"${l}"`).join(', ');
  lines.push(`labels: [${labels}]`);

  lines.push(`created: "${new Date(newsletter.createdAt).toISOString()}"`);

  if (newsletter.lastEdited) {
    lines.push(`edited: "${new Date(newsletter.lastEdited).toISOString()}"`);
  }

  lines.push('---');
  /*********** [[[ METADATA END ]]] ***********/

  // Add title with padding
  lines.push('');
  lines.push(txtTitle);
  lines.push('='.repeat(txtTitle.length));
  lines.push('');

  // Add blog content
  return lines.concat(convertHtml2Txt(newsletter.html, { wordwrap: 100 })).join('\n');
}

// Query the newsletter endpoint itself instead of the lib in order to
// take advantage of caching.
async function getCache(id: number, baseURL: string) {
  const target = baseURL + `/blog.json`;
  try {
    const response = await fetch(target);
    const data = await response.json();
    const newsletter: Newsletter = [...data].find((item) => item.id === id);
    return newsletter;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function get(event: RequestEvent<{ id: string }>): Promise<RequestHandlerOutput> {
  const id = Number(event.params.id);
  const newsletter = await getCache(id, event.url.origin);

  if (!newsletter) {
    return new Response('404 Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new Response(serializeNewsletter(newsletter), {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
