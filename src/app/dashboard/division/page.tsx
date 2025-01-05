import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { DivisionView } from 'src/sections/division/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Division | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <DivisionView />;
}
