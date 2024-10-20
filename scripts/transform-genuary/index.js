import * as fs from 'node:fs/promises';
import { getMediaFromPins, serializeMedia } from './get-media-from-pins.js';

async function main() {
  const filepath = process.argv[2];
  const year = Number(process.argv[3]);
  const data = JSON.parse(await fs.readFile(filepath));
  const media = getMediaFromPins(data, year);
  console.log(serializeMedia(media));
}

main();
