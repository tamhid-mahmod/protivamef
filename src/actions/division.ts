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
    data: divisionsData,
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
      divisions: divisionsData?.divisions || [],
      divisionsLoading: isLoading,
      divisionsError: error,
      divisionsValidating: isValidating,
      divisionsEmpty: !isLoading && !isValidating && divisionsData?.divisions.length,
    }),
    [divisionsData, error, isLoading, isValidating]
  );

  return memoizedValue;
}
