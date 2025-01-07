import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { auth } from 'src/auth/auth';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default async function Page() {
  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
}
