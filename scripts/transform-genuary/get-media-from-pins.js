import * as fs from 'node:fs/promises';
import axios from 'axios';
import * as path from 'path';
import { uploadFileToS3 } from './s3handler.js';

const ALLOWED_MEDIA_DOMAINS = ['cdn.discordapp.com', 'i.imgur.com'];

/**
 * @param {object} mediaIn Media data
 */
export function serializeMedia(mediaIn) {
  return JSON.stringify(mediaIn, null, 2);
}

/**
 * @param {{pins: any;channel_names: {[x: string]: string;};}} data
 * @param {number} year
 */
export async function getMediaFromPins(data, year) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  console.log(`Uploading to bucket: ${bucketName}`);
  const out = [];
  for (const pin of data.pins) {
    const timestamp = new Date(pin.timestamp);
    if (timestamp.getFullYear() !== year) {
      continue;
    }

    const validURLs = getURLs(pin.text, ALLOWED_MEDIA_DOMAINS);
    if (!pin.attachments && validURLs.length === 0) {
      continue;
    }

    const attachment = pin.attachments[0];
    if (!attachment && validURLs.length === 0) {
      continue;
    }

    const src = ((attachment ? attachment.proxy_url : validURLs[0]) || null)?.replace(/\?.*$/, '');

    // Download the image
    const fileName = path.basename(src);
    const tempPath = path.join('/tmp', fileName);
    await downloadFile(src, tempPath);

    // Upload to S3
    const s3Key = `genuary/${year}/${fileName}`;
    const s3Url = await uploadFileToS3(tempPath, bucketName, s3Key);


    const alt = data.channel_names[pin.channel_id] || '';
    if (!/^(\d+) /.test(alt)) {
      continue;
    }

    const view = 'normal';
    out.push({ src: s3Url, alt, view });
  }

  out.sort((a, b) => {
    const na = a.alt.match(/^(\d+) /);
    const nb = b.alt.match(/^(\d+) /);
    return parseInt(na) - parseInt(nb);
  });

  return out;
}

/**
 * @param {string} str
 * @param {string[]} validDomains
 */
function getURLs(str, validDomains) {
  // Regular expression to match URLs.
  const regex = /(https?:\/\/[^\s]+)/g;
  // Extract URLs from the string.
  const urls = str.match(regex) || [];

  // Filter the list of URLs.
  return urls.filter((url) => {
    const matches = url.match(/https?:\/\/([^/]+)/);
    if (matches == null || matches.length <= 1) {
      return false;
    }

    const domain = matches[1]; // Extract the domain from the URL
    return validDomains.indexOf(domain) !== -1; // Return true if the domain is in the list of valid domains
  });
}

export async function downloadFile(url, dest) {
  const response = await axios({ method: 'get', url, responseType: 'stream' });
  console.log(`Downloading ${url} to ${dest}`);
  const writer = await fs.open(dest, 'w');
  await new Promise((resolve, reject) => {
    response.data.pipe(writer.createWriteStream()).on('finish', resolve).on('error', reject);
  });
  await writer.close();
}
