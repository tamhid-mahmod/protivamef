import { S3Client, ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3';

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
    region: 'auto', // Required but unused for R2
    endpoint: `https://${CONFIG.r2.accountId}.r2.cloudflarestorage.com/protivamef`,
    credentials: {
      accessKeyId: CONFIG.r2.accessKeyId,
      secretAccessKey: CONFIG.r2.secretAccessKey,
    },
    forcePathStyle: true, // Required for R2 compatibility
  });

  const { bucket, key } = payload;
  const bucketName = bucket || CONFIG.r2.bucketName;

  try {
    const file = formData.get('file') as File;

    if (!file) {
      throw new Error('No file provided in form data.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${key}/${timestamp}-${randomString}.${fileExtension}`;

    const fileUploadParams = {
      Bucket: bucketName,
      Key: uniqueFileName,
      Body: buffer,
      ContentType: file.type,
      ACL: ObjectCannedACL.public_read, // Use enum value instead of string
    };

    const command = new PutObjectCommand(fileUploadParams);
    await s3.send(command);

    // Construct public URL using custom domain or default R2 public endpoint
    const fileUrl = CONFIG.r2.publicUrl
      ? `${CONFIG.r2.publicUrl}/${uniqueFileName}`
      : `https://${CONFIG.r2.accountId}.r2.cloudflarestorage.com/protivamef/${bucketName}/${uniqueFileName}`;

    return fileUrl;
  } catch (error) {
    console.error('Error uploading image to R2:', error);
    throw new Error('Failed to upload image to Cloudflare R2.');
  }
}
