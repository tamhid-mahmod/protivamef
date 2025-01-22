import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { getCourse } from 'src/actions/course-ssr';

import { CourseEditView } from 'src/sections/course/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Course edit | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: { courseId: string };
};

export default async function Page({ params }: Props) {
  const { courseId } = params;

  const { course } = await getCourse(courseId);

  return <CourseEditView course={course} />;
}
