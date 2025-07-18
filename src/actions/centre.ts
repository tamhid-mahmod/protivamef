import type {
  ICentreItem,
  // ICentreCourseItem,
  ICentresWithDivisionAndDistrict,
} from 'src/types/centre';

import { useMemo } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { client } from 'src/lib/trpc';

// ----------------------------------------------------------------------

type CentresData = {
  centres: ICentreItem[];
};

export function useGetCentres() {
  const {
    data,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<CentresData> = useQuery({
    queryKey: ['centres'],
    queryFn: async () => {
      const res = await client.centre.getCentres.$get();
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      centres: data?.centres || [],
      centresLoading: isLoading,
      centresError: error,
      centresValidating: isValidating,
      centresEmpty: !isLoading && !isValidating && data?.centres.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type CentresWithDivisionAndDistrictData = {
  centres: ICentresWithDivisionAndDistrict[];
};

export function useGetCentresWithDivisionAndDistrict() {
  const {
    data,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<CentresWithDivisionAndDistrictData> = useQuery({
    queryKey: ['centres'],
    queryFn: async () => {
      const res = await client.centre.getCentresWithDivisionAndDistrict.$get();
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      centres: data?.centres || [],
      centresLoading: isLoading,
      centresError: error,
      centresValidating: isValidating,
      centresEmpty: !isLoading && !isValidating && data?.centres.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// type AssignedCoursesData = {
//   assignedCourses: ICentreCourseItem[];
// };

export function useGetAssignedCourses(centreId: string) {
  const {
    data,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<any> = useQuery({
    queryKey: ['centre-courses'],
    queryFn: async () => {
      const res = await client.centre.getAssignedCourses.$get({ centreId });
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      assignedCourses: data?.assignedCourses || [],
      assignedCoursesLoading: isLoading,
      assignedCoursesError: error,
      assignedCoursesValidating: isValidating,
      assignedCoursesEmpty: !isLoading && !isValidating && data?.assignedCourses.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
