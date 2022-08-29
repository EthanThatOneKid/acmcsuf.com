import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit/types/internal';
import type { Newsletter } from './_query';

async function getCache(id: number, origin: string) {
  const target = new URL('/blog.json', origin);

  const response = await fetch(target.toString());
  const payload = await response.json();

  if (payload.posts && payload.posts.length > 0) {
    const posts = payload.posts as Newsletter[];
    return posts.find((item) => item.id === id);
  }
}

export async function get(event: RequestEvent<{ id: string }>): Promise<RequestHandlerOutput> {
  const id = Number(event.params.id);
  const payload = await getCache(id, event.url.origin);

  if (typeof payload === 'undefined') {
    return new Response(null, { status: 404, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
