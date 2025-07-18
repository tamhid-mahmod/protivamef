// import type { IResultItem } from 'src/types/result';

import { useMemo } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { client } from 'src/lib/trpc';

// ----------------------------------------------------------------------

// type ResultsData = {
//   results: IResultItem[];
// };

export function useGetResults() {
  const {
    data,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<any> = useQuery({
    queryKey: ['results'],
    queryFn: async () => {
      const res = await client.result.getResults.$get();
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      results: data?.results || [],
      resultsLoading: isLoading,
      resultsError: error,
      resultsValidating: isValidating,
      resultsEmpty: !isLoading && !isValidating && data?.results.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
