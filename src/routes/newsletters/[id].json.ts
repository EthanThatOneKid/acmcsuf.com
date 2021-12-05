import type { EndpointOutput } from '@sveltejs/kit';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';

const getCache = async (id: number, baseURL: string) => {
  const target = baseURL + `/newsletters.json`;
  try {
    const response = await fetch(target);
    const data = await response.json();
    const newsletter = [...data].find((item) => item.id === id);
    console.log({ id, data, newsletter });
    return newsletter;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export async function get(request): Promise<EndpointOutput> {
  const id = Number(request.params.id);
  const base = `http://${request.host}`;
  const body = (await getCache(id, base)) as unknown as DefaultBody;
  if (typeof body === 'undefined') {
    return { body: {}, status: 404, headers: { 'Content-Type': 'application/json' } };
  }
  return { body, status: 200, headers: { 'Content-Type': 'application/json' } };
}
