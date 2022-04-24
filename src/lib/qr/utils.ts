import QRCode from 'qrcode';

export function normalizeLinkName(link: string): string {
  const cleanedLink = link.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
  return cleanedLink;
}

export function genQRCodeSvg(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    QRCode.toString(url, { type: 'svg' }, (err, svg) => {
      if (err) reject(err);
      resolve(svg);
    });
  });
}
