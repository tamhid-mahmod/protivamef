import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ApplyView } from 'src/sections/apply/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Apply online - ${CONFIG.appName}` };

export default function Page() {
  return <ApplyView />;
}
