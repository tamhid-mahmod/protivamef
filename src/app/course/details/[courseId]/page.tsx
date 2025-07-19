import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { getCourse } from 'src/actions/course-ssr';

import { CourseHomeDetailsView } from 'src/sections/course-home/view';

// ----------------------------------------------------------------------

type Props = {
  params: { courseId: string };
};

export const metadata: Metadata = { title: `Course - ${CONFIG.appName}` };

export default async function Page({ params }: Props) {
  const { courseId } = params;

  const { course } = await getCourse(courseId);

  return <CourseHomeDetailsView course={course} />;
}
