import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { getStudent } from 'src/actions/student-ssr';

import { ApplySuccessView } from 'src/sections/apply/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Application - ${CONFIG.appName}` };

type Props = {
  params: { studentId: string };
};

export default async function Page({ params }: Props) {
  const { studentId } = params;

  const { student } = await getStudent(studentId);

  return <ApplySuccessView student={student} />;
}
