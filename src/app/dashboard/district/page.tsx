import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { DistrictListView } from 'src/sections/district/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Division | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <DistrictListView />;
}
