import type { EndpointOutput } from '@sveltejs/kit';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';
import type { Newsletter } from './_query';
import { newslettersQuery } from './_query';

export const cache = new Map<number, Newsletter>();

const getCache = async () => {
  const ghAccessToken = import.meta.env.VITE_GH_ACCESS_TOKEN;
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `token ${ghAccessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: newslettersQuery }),
  });
  const newsletters = formatNewsletters(await response.json());
  newsletters.forEach((newsletter: Newsletter) => cache.set(newsletter.id, newsletter));
  return newsletters;
};

const formatNewsletters = (output: any): Newsletter[] => {
  console.log(JSON.stringify(output, null, 2));
  const discussions = output.data.repository.discussions.nodes;
  return discussions.map(
    (discussion: any): Newsletter => ({
      id: discussion.number,
      title: discussion.title,
      html: discussion.bodyHTML,
      lastEdited: discussion.lastEditedAt,
      labels: discussion.labels.nodes.map(({ name }) => name),
      author: {
        displayname: discussion.author.login,
        url: discussion.author.url,
        picture: discussion.author.avatarUrl,
      },
    })
  );
};

export async function get(): Promise<EndpointOutput> {
  return {
    body: (await getCache()) as unknown as DefaultBody,
    headers: {
      'content-type': 'application/json',
    },
  };
}
