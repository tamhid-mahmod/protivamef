import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { useBoolean } from 'minimal-shared/hooks';
import { useRef, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

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

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { AdmitPrint } from './admit-print';

// ----------------------------------------------------------------------

export type SearchCertificateSchemaType = zod.infer<typeof SearchCertificateSchema>;

export const SearchCertificateSchema = zod.object({
  studentId: zod.string().min(1, { message: 'Student ID is required!' }),
});

// ----------------------------------------------------------------------

export function AdmitForm() {
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

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

  const defaultValues: SearchCertificateSchemaType = {
    studentId: '',
  };

  const methods = useForm<SearchCertificateSchemaType>({
    resolver: zodResolver(SearchCertificateSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onOpen();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetailsDialog = () => (
    <Dialog fullScreen open={open}>
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
          <AdmitPrint ref={contentRef} />
        </Box>
      </Container>
    </Dialog>
  );

  const renderDetails = () => (
    <Card>
      <CardHeader title="Student admit" />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="studentId" label="Student ID" />

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
        loading={isSubmitting}
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
