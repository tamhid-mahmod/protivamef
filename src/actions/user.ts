import { useMemo } from 'react';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { client } from 'src/lib/trpc';

// ----------------------------------------------------------------------

export function useGetUsers() {
  const {
    data,
    isPending: isLoading,
    error,
    isFetching: isValidating,
  }: UseQueryResult<any> = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await client.user.getUsers.$get();
      return await res.json();
    },
  });

  const memoizedValue = useMemo(
    () => ({
      users: data?.users || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !isValidating && data?.users.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
