'use client';

import type { ICourseItem } from 'src/types/course';
import type { ICategoryItem } from 'src/types/category';

import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Table, TableRow, TableBody, TableCell } from '@mui/material';

import { paths } from 'src/routes/paths';

import { TableHeadCustom, type TableHeadCellProps } from 'src/components/table';

import { CourseHomeHero } from '../course-home-hero';

// ----------------------------------------------------------------------

type Props = {
  category: ICategoryItem;
  courses: ICourseItem[];
};

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'code', label: 'Code' },
  { id: 'course', label: 'Course' },
  { id: 'qualification', label: 'Qualification', align: 'center' },
  { id: 'duration', label: 'Duration', align: 'center' },
];

export function CourseHomeView({ category, courses }: Props) {
  return (
    <>
      <CourseHomeHero category={category} />
      <Container component="section" sx={{ pb: 10, position: 'relative', pt: { xs: 10, md: 15 } }}>
        <Typography variant="h3" mb={4}>
          Courses we offers
        </Typography>

        <Table sx={{ minWidth: 800 }}>
          <TableHeadCustom headCells={TABLE_HEAD} />

          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.title}>
                <TableCell>({course.code})</TableCell>
                <TableCell>
                  <Link key={course.id} href={paths.course.details(course.id)}>
                    {course.title}
                  </Link>
                </TableCell>
                <TableCell align="center">{course.qualification}</TableCell>
                <TableCell align="center">{course.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
}
