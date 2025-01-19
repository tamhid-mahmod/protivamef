import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

type UploadImageToS3Payload = {
  bucket?: string;
  key: string;
};

export async function uploadImageToS3(
  formData: FormData,
  payload: UploadImageToS3Payload
): Promise<string> {
  const s3 = new S3Client({
    region: CONFIG.s3Bucket.region,
    credentials: {
      accessKeyId: CONFIG.s3Bucket.accessKeyId,
      secretAccessKey: CONFIG.s3Bucket.secretAccessKey,
    },
  });

  const { bucket, key } = payload;

  try {
    const file = formData.get('file') as File;

    if (!file) {
      throw new Error('No file provided in form data.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const timestamp = new Date().toISOString().replace(/[-:.]/g, ''); // e.g., 20250118T101530
    const randomString = Math.random().toString(36).substring(2, 8); // e.g., "abc123"
    const fileExtension = file.name.split('.').pop(); // Get file extension
    const uniqueFileName = `${key}/${timestamp}-${randomString}.${fileExtension}`;

    const fileUploadParams = {
      Bucket: bucket || CONFIG.s3Bucket.bucketName,
      Key: uniqueFileName,
      Body: buffer,
      ContentType: file.type,
    };

    const imageParam = new PutObjectCommand(fileUploadParams);
    await s3.send(imageParam);

    const fileUrl = `https://${CONFIG.s3Bucket.bucketName}.s3.${CONFIG.s3Bucket.region}.amazonaws.com/${uniqueFileName}`;

    return fileUrl;
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    throw new Error('Failed to upload image to S3.');
  }
}
