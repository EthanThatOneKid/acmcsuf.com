import type { EndpointOutput } from '@sveltejs/kit';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';
import type { Newsletter } from './_query';
import { newslettersQuery } from './_query';

const getCache = async () => {
  const ghAccessToken = import.meta.env.VITE_GH_ACCESS_TOKEN;
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `token ${ghAccessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: newslettersQuery }),
  });
  return formatNewsletters(await response.json());
};

const formatNewsletters = (output: any): Newsletter[] => {
  console.log(JSON.stringify(output, null, 2));
  const discussions = output.data.repository.discussions.nodes;
  return discussions.map(
    (discussion: any): Newsletter => ({
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
  };
}
