import type { drive_v3 } from 'googleapis';
import { google } from 'googleapis';

export function getDrive(apiKey: string) {
  return google.drive({
    version: 'v3',
    auth: apiKey,
  });
}

export async function listFiles(drive: drive_v3.Drive, id: string) {
  const files: drive_v3.Schema$File[] = [];
  let pageToken: string | undefined;

  while (true) {
    const result = await drive.files.list({
      q: `'${id}' in parents`,
      pageToken,
      // https://developers.google.com/drive/api/guides/fields-parameter
      fields: 'files(id, name, mimeType, webContentLink)',
    });
    if (result.data?.files === undefined) {
      break;
    }

    files.push(...result.data.files);
    if (!result.data?.nextPageToken) {
      break;
    }

    pageToken = result.data.nextPageToken;
  }

  return files;
}
