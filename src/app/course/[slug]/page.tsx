import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { getCoursesBySlug } from 'src/actions/course-ssr';

import { CourseHomeView } from 'src/sections/course-home/view';

// ----------------------------------------------------------------------

type Props = {
  params: { slug: string };
};

export const metadata: Metadata = { title: `Course - ${CONFIG.appName}` };

export default async function Page({ params }: Props) {
  const { slug } = params;

  const { category, courses } = await getCoursesBySlug(slug);

  return <CourseHomeView category={category} courses={courses} />;
}
