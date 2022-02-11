import type { EndpointOutput } from '@sveltejs/kit';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';
import { fetchNewsletters } from './_query';

export async function get(): Promise<EndpointOutput> {
  return {
    body: (await fetchNewsletters()) as unknown as DefaultBody,
    headers: {
      'content-type': 'application/json',
    },
  };
}
