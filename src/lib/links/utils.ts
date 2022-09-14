import QRCode from 'qrcode';
import { LINKS } from './data';

export function parseLink(link: string): keyof typeof LINKS | undefined {
  const cleanedLinkName = link
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-zA-Z0-9-/]/g, '')
    .toLowerCase();

  if (!(cleanedLinkName in LINKS)) return;

  return cleanedLinkName as keyof typeof LINKS;
}

export function genQRCodeSvg(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    QRCode.toString(url, { type: 'svg' }, (err, svg: string | PromiseLike<string>) => {
      if (err) reject(err);
      resolve(svg);
    });
  });
}
