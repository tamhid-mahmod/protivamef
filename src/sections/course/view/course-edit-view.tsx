'use client';

import type { ICourseItem } from 'src/types/course';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CourseNewEditForm } from '../course-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  course?: ICourseItem;
};

export function CourseEditView({ course: currentCourse }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        backHref={paths.dashboard.course.root}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Course', href: paths.dashboard.course.root },
          { name: currentCourse?.code },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CourseNewEditForm currentCourse={currentCourse} />
    </DashboardContent>
  );
}
