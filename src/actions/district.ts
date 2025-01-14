import type { IDistrictItem } from 'src/types/district';

import { useMemo } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { client } from 'src/lib/trpc';

// ----------------------------------------------------------------------

type DistrictsData = {
  districts: IDistrictItem[];
};

export function useGetDistricts() {
  const {
    data: districtsData,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<DistrictsData> = useQuery({
    queryKey: ['districts'],
    queryFn: async () => {
      const res = await client.district.getDistricts.$get();
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      districts: districtsData?.districts || [],
      districtsLoading: isLoading,
      districtsError: error,
      districtsValidating: isValidating,
      districtsEmpty: !isLoading && !isValidating && districtsData?.districts.length,
    }),
    [districtsData, error, isLoading, isValidating]
  );

  return memoizedValue;
}
