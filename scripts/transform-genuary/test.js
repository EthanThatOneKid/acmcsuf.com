import * as fs from 'node:fs/promises';
import {getMediaFromPins} from './get-media-from-pins.js'

const ALLOWED_MEDIA_DOMAINS = ["cdn.discordapp.com", "i.imgur.com"];

main();

async function main() {
  const filepath = "./in.json";
  const data = JSON.parse(await fs.readFile(filepath));

  const expectedFilepath = "./out.json";
  const expectedData = fs.readFile(expectedFilepath);

  const media = getMediaFromPins(data, 2023);
  const outputLog = JSON.stringify(media, null, 2);
  if (expectedData != outputLog) {
    console.log("We have a prbolem");
    process.exit(1);
  }
}
