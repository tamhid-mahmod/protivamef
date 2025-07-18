import type { IStudentAllItem } from 'src/types/student';

import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { useBoolean } from 'minimal-shared/hooks';
import { useRef, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { client } from 'src/lib/trpc';
import { GetAdmitSchema, type GetAdmitSchemaType } from 'src/schemas/admit';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { AdmitPrint } from './admit-print';

// ----------------------------------------------------------------------

export function AdmitForm() {
  const queryClient = useQueryClient();
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const [isPrinting, setIsPrinting] = useState(false);
  const [admit, setAdmit] = useState<IStudentAllItem | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const promiseResolveRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

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

  const defaultValues: GetAdmitSchemaType = {
    studentAId: '',
  };

  const methods = useForm<GetAdmitSchemaType>({
    resolver: zodResolver(GetAdmitSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: handleAdmit, isPending } = useMutation({
    mutationFn: async (data: GetAdmitSchemaType) => {
      const response = await client.admit.getAdmit.$post(data);
      return await response.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['admit'] });
      reset();
      setAdmit(data.admit);
      onOpen();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    handleAdmit(data);
  });

  const renderDetailsDialog = () => (
    <Dialog fullScreen open={!!admit && open}>
      <AppBar position="relative" color="default">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={onClose}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>

          <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
            Admit
          </Typography>

          <LoadingButton
            autoFocus
            color="inherit"
            variant="contained"
            loadingPosition="start"
            loading={isPrinting}
            startIcon={<Iconify icon="mingcute:print-fill" />}
            onClick={() => handlePrint()}
          >
            Print
          </LoadingButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ height: 1 }}>
        <Box
          sx={{
            height: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AdmitPrint ref={contentRef} admit={admit!} />
        </Box>
      </Container>
    </Dialog>
  );

  const renderDetails = () => (
    <Card>
      <CardHeader title="Student admit" />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="studentAId" label="Student ID" />

        {renderActions()}
      </Stack>
    </Card>
  );

  const renderActions = () => (
    <Box
      sx={{
        gap: 3,
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
  );

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
          {renderDetails()}
        </Stack>
      </Form>

      {renderDetailsDialog()}
    </>
  );
}
