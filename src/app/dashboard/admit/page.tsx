import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { AdmitView } from 'src/sections/admit/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Admit card | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <AdmitView />;
}
