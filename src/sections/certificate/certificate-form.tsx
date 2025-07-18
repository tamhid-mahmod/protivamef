import type { ICertificateItem } from 'src/types/certificate';

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
import { GetCertificateSchema, type GetCertificateSchemaType } from 'src/schemas/certificate';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { CertificatePrint } from './certificate-print';

// ----------------------------------------------------------------------

export function CertificateForm() {
  const queryClient = useQueryClient();
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const [certificate, setCertificate] = useState<ICertificateItem | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

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

  const defaultValues: GetCertificateSchemaType = {
    studentAId: '',
  };

  const methods = useForm<GetCertificateSchemaType>({
    resolver: zodResolver(GetCertificateSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: handleCertificate, isPending } = useMutation({
    mutationFn: async (data: GetCertificateSchemaType) => {
      const response = await client.certificate.getCertificate.$post(data);
      return await response.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['certificate'] });
      reset();
      setCertificate(data.certificate);
      onOpen();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    handleCertificate(data);
  });

  const renderDetailsDialog = () => (
    <Dialog fullScreen open={!!certificate && open}>
      <AppBar position="relative" color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => {
              onClose();
              setCertificate(null);
            }}
          >
            <Iconify icon="mingcute:close-line" />
          </IconButton>

          <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
            Certificate
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
          <CertificatePrint ref={contentRef} certificate={certificate!} />
        </Box>
      </Container>
    </Dialog>
  );

  const renderDetails = () => (
    <Card>
      <CardHeader title="Student certificate" />

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
