import type { ICentreCourseItem } from 'src/types/centre';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { CentreCourseItem } from './centre-course-item';

// ----------------------------------------------------------------------

type Props = {
  assignedCourses: ICentreCourseItem[];
};

export function CentreCourseList({ assignedCourses }: Props) {
  const ITEMS_PER_PAGE = 12;

  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(assignedCourses.length / ITEMS_PER_PAGE);

  // Get the courses for the current page
  const paginatedCourses = assignedCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value); // Update current page
  };

  const handleDelete = useCallback((id: string) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)',
          },
        }}
      >
        {paginatedCourses.map((course) => (
          <CentreCourseItem
            key={course.id}
            course={course}
            onUnsigned={() => handleDelete(course.id)}
          />
        ))}
      </Box>

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
