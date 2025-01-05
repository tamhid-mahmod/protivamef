'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { DivisionNewEditForm } from '../division-new-edit-form';

// ----------------------------------------------------------------------

export function DivisionView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Division"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Region', href: paths.dashboard.region.root },
          { name: 'Division' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <DivisionNewEditForm />
    </DashboardContent>
  );
}
