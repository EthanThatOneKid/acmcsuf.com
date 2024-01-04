import * as fs from 'node:fs/promises';
import { getMediaFromPins, serializeMedia } from './get-media-from-pins.js';

async function main() {
  const year = new Date().getFullYear(); // TODO(@ethanthatonekid): Replace during_challenge with year.
  const filepath = process.argv[2];
  const data = JSON.parse(await fs.readFile(filepath));
  const media = getMediaFromPins(data);
  console.log(serializeMedia(media));
}

main();
