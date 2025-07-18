import type { IDivisionItem } from 'src/types/division';

import { useMemo } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { client } from 'src/lib/trpc';

// ----------------------------------------------------------------------

type DivisionsData = {
  divisions: IDivisionItem[];
};

export function useGetDivisions() {
  const {
    data,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<DivisionsData> = useQuery({
    queryKey: ['divisions'],
    queryFn: async () => {
      const res = await client.division.getDivisions.$get();
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      divisions: data?.divisions || [],
      divisionsLoading: isLoading,
      divisionsError: error,
      divisionsValidating: isValidating,
      divisionsEmpty: !isLoading && !isValidating && data?.divisions.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// type DivisionsWithDistrictsData = {
//   divisionsWithDistricts: IDivisionWithDistrictsItem[];
// };

export function useGetDivisionsWithDistricts() {
  const {
    data,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<any> = useQuery({
    queryKey: ['divisions-with-districts'],
    queryFn: async () => {
      const res = await client.division.getDivisionsWithDistricts.$get();
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      divisionsWithDistricts: data?.divisionsWithDistricts || [],
      divisionsWithDistrictsLoading: isLoading,
      divisionsWithDistrictsError: error,
      divisionsWithDistrictsValidating: isValidating,
      divisionsWithDistrictsEmpty:
        !isLoading && !isValidating && data?.divisionsWithDistricts.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
