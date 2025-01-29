'use client';

import type { IStudentAllItem } from 'src/types/student';

import Grid from '@mui/material/Grid2';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { StudentEducationEditForm } from '../student-education-edit-form';
import { StudentInformationEditForm } from '../student-information-edit-form';

// ----------------------------------------------------------------------

type Props = {
  student?: IStudentAllItem;
};

export function StudentEditView({ student: currentStudent }: Props) {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Edit"
        backHref={paths.dashboard.student.root}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Student', href: paths.dashboard.centre.root },
          { name: currentStudent?.fullName },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <StudentInformationEditForm currentStudent={currentStudent} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <StudentEducationEditForm currentEducation={currentStudent?.educationBackground} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
