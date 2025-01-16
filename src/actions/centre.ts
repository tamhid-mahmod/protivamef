import type { ICentresWithDivisionAndDistrict } from 'src/types/centre';

import { useMemo } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { client } from 'src/lib/trpc';

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
