import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CentreCreateView } from 'src/sections/centre/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Create a centre | Dashboard - ${CONFIG.appName}`,
};

export default function Page() {
  return <CentreCreateView />;
}
