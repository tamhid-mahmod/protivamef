'use client';

import type { ICourseItem } from 'src/types/course';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Markdown } from 'src/components/markdown';
import { CustomBreadcrumbs, CustomBreadcrumbsBackground } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

type Props = {
  course: ICourseItem;
};

export function CourseHomeDetailsView({ course }: Props) {
  return (
    <>
      <CustomBreadcrumbsBackground>
        <CustomBreadcrumbs
          heading={course.title}
          links={[{ name: 'Home', href: '/' }, { name: 'course' }, { name: course.title }]}
        />
      </CustomBreadcrumbsBackground>

      <Container sx={{ my: 10 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4"> {course.title} </Typography>
        </Stack>
        <Divider sx={{ my: 5 }} />

        <Markdown children={course.description} />
      </Container>
    </>
  );
}
