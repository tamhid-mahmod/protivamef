import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CertificateView } from 'src/sections/certificate/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Certificate | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CertificateView />;
}
