import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit/types/internal';
import type { Newsletter } from './_query';

async function getCache(id: number, origin: string) {
  const target = origin + `/blog.json`;

  try {
    const response = await fetch(target);
    const data = await response.json();
    const newsletter = (data as Newsletter[]).find((item) => {
      return item.id === id;
    });
    return newsletter;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function get(event: RequestEvent<{ id: number }>): Promise<RequestHandlerOutput> {
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
