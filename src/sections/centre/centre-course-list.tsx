import type { ICourseItem } from 'src/types/course';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { CentreCourseItem } from './centre-course-item';

// ----------------------------------------------------------------------

type Props = {
  courses: ICourseItem[];
};

export function CentreCourseList({ courses }: Props) {
  const handleDelete = useCallback((id: string) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {courses.map((course) => (
          <CentreCourseItem
            key={course.id}
            course={course}
            onUnsigned={() => handleDelete(course.id)}
          />
        ))}
      </Box>

      {courses.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
