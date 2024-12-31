import {
  S3Client,
  ListObjectsV2Command,
  DeleteObjectsCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { lookup } from 'mime-types';
import fs from 'fs/promises';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Empty the S3 bucket by deleting all objects.
 * @param {string} bucketName - S3 bucket name.
 */
async function clearS3Bucket(bucketName) {
  let isTruncated = true;
  while (isTruncated) {
    // List objects in the bucket
    const { Contents, IsTruncated } = await s3.send(
      new ListObjectsV2Command({ Bucket: bucketName })
    );
    isTruncated = IsTruncated;

    if (Contents?.length > 0) {
      const deleteParams = {
        Bucket: bucketName,
        Delete: {
          Objects: Contents.map(({ Key }) => ({ Key })),
        },
      };

      // Delete objects in the bucket
      await s3.send(new DeleteObjectsCommand(deleteParams));
      console.log(`Deleted ${Contents.length} objects from S3 bucket: ${bucketName}`);
    }

    // Continue if there are more objects to delete
    if (isTruncated) {
      console.log(`Fetching next batch of objects to delete...`);
    }
  }
}

/**
 * Upload a file to S3.
 * @param {string} filePath - Path to the file.
 * @param {string} bucketName - S3 bucket name.
 * @returns {Promise<string>} - S3 URL of the uploaded file.
 */
async function uploadFileToS3(filePath, bucketName, key) {
  // const fileName = filePath.split('/').pop(); // Use the file name as the S3 key
  const fileContent = await fs.readFile(filePath);
  const contentType = lookup(filePath) || 'application/octet-stream';

  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: fileContent,
      ContentType: contentType,
    })
  );

  console.log(`Uploaded file to S3: ${key}`);
  return `https://${bucketName}.s3.amazonaws.com/${key}`;
}

export { clearS3Bucket, uploadFileToS3 };
