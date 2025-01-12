'use client';

import { useState } from 'react';
import { HTTPException } from 'hono/http-exception';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';

import type { QueryClientProviderProps } from './types';

// ----------------------------------------------------------------------

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            let errorMessage: string;
            if (err instanceof HTTPException) {
              errorMessage = err.message;
            } else if (err instanceof Error) {
              errorMessage = err.message;
            } else {
              errorMessage = 'An unknown error occurred.';
            }
            // Handle the error here (e.g., log or show toast notifications)
            console.log(errorMessage);
          },
        }),
      })
  );

  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
}
