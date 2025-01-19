import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { getCentre } from 'src/actions/centre-ssr';

import { CentreEditView } from 'src/sections/centre/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Centre edit | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: { centreId: string };
};

export default async function Page({ params }: Props) {
  const { centreId } = params;

  const { centre } = await getCentre(centreId);

  return <CentreEditView centre={centre} />;
}
