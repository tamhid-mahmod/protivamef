import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CategoryCreateView } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Create a course category | Dashboard - ${CONFIG.appName}`,
};

export default function Page() {
  return <CategoryCreateView />;
}
