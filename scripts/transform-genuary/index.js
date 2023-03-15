import * as fs from 'node:fs/promises';
import {getMediaFromPins} from './get-media-from-pins.js'

const ALLOWED_MEDIA_DOMAINS = ["cdn.discordapp.com", "i.imgur.com"];

main();

async function main() {
  const year = new Date().getFullYear(); // TODO(@ethanthatonekid): Figure this out. 
  const filepath = process.argv[2];
  const data = JSON.parse(await fs.readFile(filepath));

  const media = getMediaFromPins(data, year);
  console.log(JSON.stringify(media, null, 2));
}
