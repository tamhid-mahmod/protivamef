import type { SWRConfiguration } from 'swr';
import type { ICentreItem } from 'src/types/centre';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/lib/axios';

// ----------------------------------------------------------------------

const swrOptions: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

type CentresData = {
  centres: ICentreItem[];
};

export function useGetCentres() {
  const url = endpoints.centre.list;

  const { data, isLoading, error, isValidating } = useSWR<CentresData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      centres: data?.centres || [],
      centresLoading: isLoading,
      centresError: error,
      centresValidating: isValidating,
      centresEmpty: !isLoading && !isValidating && !data?.centres.length,
    }),
    [data?.centres, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type CentreData = {
  centre: ICentreItem;
};

export function useGetCentre(centreId: string) {
  const url = centreId ? [endpoints.centre.details, { params: { centreId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR<CentreData>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      centre: data?.centre,
      centreLoading: isLoading,
      centreError: error,
      centreValidating: isValidating,
    }),
    [data?.centre, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type SearchResultsData = {
  results: ICentreItem[];
};

export function useSearchCentres(query: string) {
  const url = query ? [endpoints.centre.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR<SearchResultsData>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
