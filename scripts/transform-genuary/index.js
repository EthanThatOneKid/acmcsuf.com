import * as fs from 'node:fs/promises';
import { getMediaFromPins, serializeMedia } from './get-media-from-pins.js';

main();

async function main() {
  const year = new Date().getFullYear(); // TODO(@ethanthatonekid): Figure this out.
  const filepath = process.argv[2];
  const data = JSON.parse(await fs.readFile(filepath));

  const media = getMediaFromPins(data, year);
  console.log(serializeMedia(media));
}
