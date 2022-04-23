import QRCode from 'qrcode';
import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit/types/internal';
import { links } from '$lib/constants/links';
import { clean } from '$lib/constants/utils';

function genQRCodeSvg(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    QRCode.toString(url, { type: 'svg' }, (err, svg) => {
      if (err) reject(err);
      resolve(svg);
    });
  });
}

export async function get(event: RequestEvent<{ link: string }>): Promise<RequestHandlerOutput> {
  const destination = links[clean(event.params.link)];
  const payload = await genQRCodeSvg(destination);

  return new Response(payload, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
