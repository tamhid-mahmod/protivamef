import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CourseCreateView } from 'src/sections/course/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Create a new course | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CourseCreateView />;
}
