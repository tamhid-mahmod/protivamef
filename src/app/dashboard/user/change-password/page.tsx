import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { UserChangePasswordView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Change password | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <UserChangePasswordView />;
}
