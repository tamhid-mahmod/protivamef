import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { getStudent } from 'src/actions/student-ssr';

import { StudentEditView } from 'src/sections/student/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Centre edit | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: { studentId: string };
};

export default async function Page({ params }: Props) {
  const { studentId } = params;

  const { student } = await getStudent(studentId);

  return <StudentEditView student={student} />;
}
