import * as fs from 'node:fs/promises';

async function main() {
  const filepath = process.argv[2];
  const content = JSON.parse(await fs.readFile(filepath));

  let out = [];
  for (const pin of content.pins) {
    if (!pin.attachments) {
      continue;
    }

    const src = pin.attachments[0].url || null;
    const alt = content.channel_names[pin.channel_id] || '';
    out.push({
      src,
      alt,
      view: 'normal',
    });
  }

  out.sort((a, b) => {
    const na = a.alt.match(/^(\d+) /) || null;
    const nb = b.alt.match(/^(\d+) /) || null;
    if (na === null && nb === null) return 0;
    if (na === null) return 1;
    if (nb === null) return -1;
    return parseInt(na) - parseInt(nb);
  });

  console.log(JSON.stringify(out, null, 2));
}

main();
