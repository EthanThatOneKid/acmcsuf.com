import * as fs from 'node:fs/promises';
import { getMediaFromPins, serializeMedia } from './get-media-from-pins.js';

main();

async function main() {
  const filepath = './scripts/transform-genuary/in.json';
  const data = JSON.parse(await fs.readFile(filepath, 'utf-8'));

  const expectedFilepath = './scripts/transform-genuary/out.json';
  const expectedLog = await fs.readFile(expectedFilepath, 'utf-8');

  const media = getMediaFromPins(data, 2023);
  const outputLog = serializeMedia(media);
  if (expectedLog !== outputLog + '\n') {
    console.log('We have a problem');
    process.exit(1);
  }
}
