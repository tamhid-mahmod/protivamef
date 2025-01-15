import type { IDistrictItem, IDistrictsWithDivisionItem } from 'src/types/district';

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

// ----------------------------------------------------------------------

type DistrictsWithDivisionData = {
  districts: IDistrictsWithDivisionItem[];
};

export function useGetDistrictsWithDivision() {
  const {
    data: districtsWithDivisionData,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<DistrictsWithDivisionData> = useQuery({
    queryKey: ['districts'],
    queryFn: async () => {
      const res = await client.district.getDistrictsWithDivision.$get();
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      districtsLoading: isLoading,
      districtsWithDivision: districtsWithDivisionData?.districts || [],
      districtsWithDivisionError: error,
      districtsWithDivisionValidating: isValidating,
      districtsWithDivisionEmpty:
        !isLoading && !isValidating && districtsWithDivisionData?.districts.length,
    }),
    [districtsWithDivisionData, error, isLoading, isValidating]
  );

  return memoizedValue;
}
