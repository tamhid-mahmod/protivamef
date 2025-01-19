'use client';

import type { ICategoryItem } from 'src/types/category';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CategoryNewEditForm } from '../category-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  category?: ICategoryItem;
};

export function CategoryEditView({ category: currentCategory }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        backHref={paths.dashboard.course.category.root}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Course', href: paths.dashboard.course.root },
          { name: 'Category', href: paths.dashboard.course.category.root },
          { name: currentCategory?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CategoryNewEditForm currentCategory={currentCategory} />
    </DashboardContent>
  );
}
