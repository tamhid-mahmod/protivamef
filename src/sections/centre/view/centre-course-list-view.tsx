'use client';

import type { ICentreItem } from 'src/types/centre';

import Grid from '@mui/material/Grid2';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CentreCourseForm } from '../centre-course-form';
import { CentreCourseList } from '../centre-course-list';

// ----------------------------------------------------------------------

type Props = {
  centre: ICentreItem;
};

export function CentreCourseListView({ centre: currentCentre }: Props) {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Assign courses"
        backHref={paths.dashboard.centre.root}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Centre', href: paths.dashboard.centre.root },
          { name: currentCentre?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <CentreCourseList courses={[]} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CentreCourseForm centreId={currentCentre.id} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
