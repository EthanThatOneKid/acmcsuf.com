import type { EndpointOutput, IncomingRequest } from '@sveltejs/kit';
import { convert as convertHtml2Txt } from 'html-to-text';
import type { Newsletter } from './_query';

interface ServerRequest extends IncomingRequest {
  params: {
    id: number;
  };
}

function serializeNewsletter(newsletter: Newsletter) {
  const txtTitle = convertHtml2Txt(newsletter.title);

  return [
    `---`,
    `id: ${newsletter.id}`,
    `title: "${txtTitle}"`,
    `author: "${newsletter.author.displayname}` +
      (newsletter.author.url !== undefined ? ` (${newsletter.author.url})"` : '"'),
    `html_url: "${newsletter.url}"`,
    `labels: [${newsletter.labels.map((l) => `"${l}"`).join(', ')}]`,
    `created: "${new Date(newsletter.createdAt).toISOString()}"`,
    `edited: "${new Date(newsletter.lastEdited).toISOString()}"`,
    `---`,
    '',
    txtTitle,
    '='.repeat(txtTitle.length),
    '',
    convertHtml2Txt(newsletter.html, { wordwrap: 100 }),
  ].join('\n');
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

export async function get(request: ServerRequest): Promise<EndpointOutput> {
  const id = Number(request.params.id);
  const base = `http://${request.host}`;
  const newsletter = await getCache(id, base);

  if (!newsletter) {
    return { body: '404 Not Found', status: 404, headers: { 'Content-Type': 'text/plain' } };
  }

  const body = serializeNewsletter(newsletter);
  return { body, status: 200, headers: { 'Content-Type': 'text/plain' } };
}
