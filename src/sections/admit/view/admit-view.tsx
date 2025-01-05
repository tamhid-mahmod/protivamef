'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { AdmitForm } from '../admit-form';

// ----------------------------------------------------------------------

export function AdmitView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Admit"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Admit' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <AdmitForm />
    </DashboardContent>
  );
}
