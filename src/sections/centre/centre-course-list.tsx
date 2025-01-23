import type { ICentreCourseItem } from 'src/types/centre';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { client } from 'src/lib/trpc';

import { toast } from 'src/components/snackbar';

import { CentreCourseItem } from './centre-course-item';

// ----------------------------------------------------------------------

type Props = {
  assignedCourses: ICentreCourseItem[];
};

export function CentreCourseList({ assignedCourses }: Props) {
  const queryClient = useQueryClient();

  const ITEMS_PER_PAGE = 12;

  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(assignedCourses.length / ITEMS_PER_PAGE);

  // Get the courses for the current page
  const paginatedData = assignedCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value); // Update current page
  };

  const { mutate: handleDelete } = useMutation({
    mutationFn: async (centreCourseId: string) => {
      await client.centre.deleteCentreCourse.$post({ centreCourseId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['centre-courses'] });
      toast.success('Course unsigned!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
        {paginatedData.map((item) => (
          <CentreCourseItem
            key={item.id}
            centreCourse={item}
            onUnsigned={() => handleDelete(item.id)}
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
