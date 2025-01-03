'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CentreNewEditForm } from '../centre-new-edit-form';

// ----------------------------------------------------------------------

export function CentreCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new centre"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Centre', href: paths.dashboard.centre.root },
          { name: 'New centre' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CentreNewEditForm />
    </DashboardContent>
  );
}
