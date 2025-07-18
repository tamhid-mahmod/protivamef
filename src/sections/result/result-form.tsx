import type { IResultItem } from 'src/types/result';

import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { useRef, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { client } from 'src/lib/trpc';
import { GetResultSchema, type GetResultSchemaType } from 'src/schemas/result';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { ResultDetails } from './result-details';

// ----------------------------------------------------------------------

export function ResultForm() {
  const queryClient = useQueryClient();

  const [result, setResult] = useState<IResultItem | null>();
  const [error, setError] = useState<string>('');
  const [isPrinting, setIsPrinting] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const defaultValues: GetResultSchemaType = {
    studentAId: '',
  };

  const methods = useForm<GetResultSchemaType>({
    resolver: zodResolver(GetResultSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: handleResult, isPending } = useMutation({
    mutationFn: async (data: GetResultSchemaType) => {
      const response = await client.result.getResult.$post(data);
      return await response.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['result'] });
      reset();
      setError('');
      setResult(data.result);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handlePrint = useReactToPrint({
    contentRef,
    onBeforePrint: () =>
      new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      }),
    onAfterPrint: () => {
      promiseResolveRef.current = null;
      setIsPrinting(false);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    handleResult(data);
  });

  return (
    <Box sx={{ mx: 'auto', maxWidth: 650 }}>
      {result ? (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Button size="small" onClick={() => setResult(null)}>
              <Iconify icon="eva:arrow-ios-back-fill" />
              Back
            </Button>
            <LoadingButton
              size="small"
              loadingPosition="start"
              loading={isPrinting}
              startIcon={<Iconify icon="mingcute:print-fill" />}
              onClick={() => handlePrint()}
            >
              Print
            </LoadingButton>
          </Box>
          <ResultDetails ref={contentRef} result={result} />
        </>
      ) : (
        <Card sx={{ p: 3 }}>
          <Form methods={methods} onSubmit={onSubmit}>
            {error && (
              <Alert
                severity="error"
                variant="outlined"
                sx={{ mb: 2 }}
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}

            <Field.Text name="studentAId" label="Student ID" />

            <Box
              sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box sx={{ flexGrow: 1 }} />

              <LoadingButton
                sx={{ alignSelf: 'end' }}
                type="submit"
                variant="contained"
                loading={isSubmitting || isPending}
              >
                Submit
              </LoadingButton>
            </Box>
          </Form>
        </Card>
      )}
    </Box>
  );
}
