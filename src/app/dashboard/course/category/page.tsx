import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CategoryListView } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Category list | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CategoryListView />;
}
