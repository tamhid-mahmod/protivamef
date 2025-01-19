import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  isStaticExport: boolean;
  auth: {
    method: 'jwt';
    skip: boolean;
    redirectPath: string;
  };
  s3Bucket: {
    bucketName: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Protivamef',
  appVersion: packageJson.version,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? '',
  isStaticExport: JSON.parse(`${process.env.BUILD_STATIC_EXPORT}`),
  /**
   * Auth
   * @method jwt
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: paths.dashboard.root,
  },
  /**
   * S3
   */
  s3Bucket: {
    bucketName: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME ?? '',
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION ?? '',
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY ?? '',
  },
};
