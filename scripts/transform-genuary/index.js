import * as fs from 'node:fs/promises';
import { getMediaFromPins, serializeMedia } from './get-media-from-pins.js';
import { clearS3Bucket } from './s3handler.js';

async function main() {
  await clearS3Bucket(process.env.AWS_S3_BUCKET_NAME);
  const filepath = process.argv[2];
  const year = Number(process.argv[3]);
  const data = JSON.parse(await fs.readFile(filepath));

  // Ensure AWS environment variables are set
  if (
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_S3_BUCKET_NAME ||
    !process.env.AWS_REGION
  ) {
    console.error('AWS credentials or bucket name or region are not set in the environment.');
    process.exit(1);
  }

  const media = await getMediaFromPins(data, year);
  console.log(serializeMedia(media));
}

main();
