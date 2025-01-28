import type { IStudentAllItem } from 'src/types/student';

import { useMemo } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { client } from 'src/lib/trpc';

// ----------------------------------------------------------------------

type StudentsData = {
  students: IStudentAllItem[];
};

export function useGetStudents() {
  const {
    data,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<StudentsData> = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await client.student.getStudents.$get();
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      students: data?.students || [],
      studentsLoading: isLoading,
      studentsError: error,
      studentsValidating: isValidating,
      studentsEmpty: !isLoading && !isValidating && data?.students.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
