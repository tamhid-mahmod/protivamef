import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CentreListView } from 'src/sections/centre/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Centre list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CentreListView />;
}
