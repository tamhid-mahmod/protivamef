'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserChangePasswordForm } from '../user-change-password-form';

// ----------------------------------------------------------------------

export function UserChangePasswordView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Change Password"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Settings' },
          { name: 'Change Password' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserChangePasswordForm />
    </DashboardContent>
  );
}
