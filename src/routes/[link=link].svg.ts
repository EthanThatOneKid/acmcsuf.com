import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit/types/internal';
import { links } from '$lib/constants/links';
import { normalizeLinkName, genQRCodeSvg } from '$lib/qr/utils';

export async function get(event: RequestEvent<{ link: string }>): Promise<RequestHandlerOutput> {
  const destination = links[normalizeLinkName(event.params.link)];
  const payload = await genQRCodeSvg(destination);

  return new Response(payload, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
