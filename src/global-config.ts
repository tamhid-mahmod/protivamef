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
  mapboxApiKey: string;
  r2: {
    publicUrl: string;
    bucketName: string;
    region: string;
    accountId: string;
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
   * Mapbox
   */
  mapboxApiKey: process.env.NEXT_PUBLIC_MAPBOX_API_KEY ?? '',
  /**
   * S3
   */
  r2: {
    publicUrl: 'https://pub-cd632192ff444a8ebea24d9e828b176e.r2.dev/protivamef',
    bucketName: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME ?? '',
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION ?? '',
    accountId: process.env.NEXT_PUBLIC_AWS_S3_ACCOUNTID ?? '',
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY ?? '',
  },
};
