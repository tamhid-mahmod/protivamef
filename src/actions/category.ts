import type { ICategoryItem } from 'src/types/category';

import { useMemo } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { client } from 'src/lib/trpc';

// ----------------------------------------------------------------------

type CategoriesData = {
  categories: ICategoryItem[];
};

export function useGetCategories() {
  const {
    data,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<CategoriesData> = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await client.category.getCategories.$get();
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      categories: data?.categories || [],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesValidating: isValidating,
      categoriesEmpty: !isLoading && !isValidating && data?.categories.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
