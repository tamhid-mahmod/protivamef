// import type { ICourseItem, ICourseWithCategoryItem } from 'src/types/course';

import { useMemo } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { client } from 'src/lib/trpc';

// ----------------------------------------------------------------------

// type CoursesData = {
//   courses: ICourseItem[];
// };

export function useGetCourses() {
  const {
    data,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<any> = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await client.course.getCourses.$get();
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      courses: data?.courses || [],
      coursesLoading: isLoading,
      coursesError: error,
      coursesValidating: isValidating,
      coursesEmpty: !isLoading && !isValidating && data?.courses.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// type CoursesWithCategoryData = {
//   coursesWithCategory: ICourseWithCategoryItem[];
// };

export function useGetCoursesWithCategory() {
  const {
    data,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<any> = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await client.course.getCoursesWithCategory.$get();
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      coursesWithCategory: data?.coursesWithCategory || [],
      coursesWithCategoryLoading: isLoading,
      coursesWithCategoryError: error,
      coursesWithCategoryValidating: isValidating,
      coursesWithCategoryEmpty: !isLoading && !isValidating && data?.coursesWithCategory.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
