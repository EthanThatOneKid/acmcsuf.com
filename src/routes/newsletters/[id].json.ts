import type { EndpointOutput, IncomingRequest } from '@sveltejs/kit';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';

interface ServerRequest extends IncomingRequest {
  params: {
    id: number;
  };
}

const getCache = async (id: number, baseURL: string) => {
  const target = baseURL + `/newsletters.json`;
  try {
    const response = await fetch(target);
    const data = await response.json();
    const newsletter = [...data].find((item) => item.id === id);
    return newsletter;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export async function get(request: ServerRequest): Promise<EndpointOutput> {
  const id = Number(request.params.id);
  const base = `http://${request.host}`;
  const body = (await getCache(id, base)) as unknown as DefaultBody;
  if (typeof body === 'undefined') {
    return { body: {}, status: 404, headers: { 'Content-Type': 'application/json' } };
  }
  return { body, status: 200, headers: { 'Content-Type': 'application/json' } };
}
