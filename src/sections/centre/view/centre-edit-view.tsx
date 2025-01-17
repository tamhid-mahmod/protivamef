'use client';

import type { ICentreItem } from 'src/types/centre';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CentreNewEditForm } from '../centre-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  centre?: ICentreItem;
};

export function CentreEditView({ centre: currentCentre }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        backHref={paths.dashboard.centre.root}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Centre', href: paths.dashboard.centre.root },
          { name: currentCentre?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CentreNewEditForm currentCentre={currentCentre} />
    </DashboardContent>
  );
}
