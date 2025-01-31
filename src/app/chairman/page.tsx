import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ChairmanView } from 'src/sections/chairman/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Chairman - ${CONFIG.appName}` };

export default function Page() {
  return <ChairmanView />;
}
