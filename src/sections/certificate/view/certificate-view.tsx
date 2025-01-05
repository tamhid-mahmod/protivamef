'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CertificateForm } from '../certificate-form';

// ----------------------------------------------------------------------

export function CertificateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Certificate"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Certificate' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CertificateForm />
    </DashboardContent>
  );
}
