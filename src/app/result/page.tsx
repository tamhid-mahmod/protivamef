import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ResultView } from 'src/sections/result/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Result - ${CONFIG.appName}` };

export default function Page() {
  return <ResultView />;
}
