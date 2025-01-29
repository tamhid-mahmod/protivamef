import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { PublishResultListView } from 'src/sections/publish-result/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Publish result | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <PublishResultListView />;
}
