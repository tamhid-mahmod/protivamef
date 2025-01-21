import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CourseListView } from 'src/sections/course/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Course list | Dashboard - ${CONFIG.appName}`,
};

export default function Page() {
  return <CourseListView />;
}
