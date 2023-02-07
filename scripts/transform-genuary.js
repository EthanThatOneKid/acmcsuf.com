import * as fs from 'node:fs/promises';

async function main() {
  const year = new Date().getFullYear();
  const filepath = process.argv[2];
  const content = JSON.parse(await fs.readFile(filepath));

  let out = [];
  for (const pin of content.pins) {
    if (!pin.attachments) {
      continue;
    }

    const attachment = pin.attachments[0];
    const src = attachment.proxy_url || null;
    const alt = content.channel_names[pin.channel_id] || '';
    if (!/^(\d+) /.test(alt)) {
      continue;
    }

    let view = 'normal';
    switch (true) {
      case attachment.width * 1.2 > attachment.height: {
        view = 'wide';
        break;
      }
      case attachment.height * 1.2 > attachment.width: {
        view = 'tall';
        break;
      }
    }

    out.push({
      src,
      alt,
      view,
      during_challenge: pin.timestamp.startsWith(`${year}-01-`),
    });
  }

  out.sort((a, b) => {
    const na = a.alt.match(/^(\d+) /);
    const nb = b.alt.match(/^(\d+) /);
    return parseInt(na) - parseInt(nb);
  });

  console.log(JSON.stringify(out, null, 2));
}

main();
