import type { IResultItem } from 'src/types/result';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useRouter } from 'src/routes/hooks';

import { today } from 'src/utils/format-time';

import { client } from 'src/lib/trpc';
import {
  NewResultSchema,
  type NewResultSchemaType,
  type UpdateResultSchemaType,
} from 'src/schemas/result';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  currentResult?: IResultItem;
};

export function PublishResultNewEditForm({ open, onClose, currentResult }: Props) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const defaultValues: NewResultSchemaType = {
    studentAId: '',
    mark: null,
    createdAt: today(),
  };

  const methods = useForm<NewResultSchemaType>({
    resolver: zodResolver(NewResultSchema),
    defaultValues,
    values: currentResult,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: handleDivision, isPending } = useMutation({
    mutationFn: async (data: UpdateResultSchemaType | NewResultSchemaType) => {
      if ('resultId' in data && currentResult) {
        await client.result.updateResult.$post(data);
      } else {
        await client.result.publushResult.$post(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['results'] });
      toast.success(currentResult ? 'Result updated!' : 'Result added!');
      if (!currentResult) {
        reset();
      }
      router.refresh();
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (currentResult) {
      handleDivision({ resultId: currentResult.id, ...data });
    } else {
      handleDivision(data);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 600 } }}
    >
      <DialogTitle>{currentResult ? 'Edit Result' : 'Publish result'}</DialogTitle>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {!currentResult && <Field.Text name="studentAId" label="Student ID" />}

            <Box
              sx={{
                rowGap: 2,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Text name="mark" type="number" placeholder="0.00" label="Mark" />

              <Field.DatePicker name="createdAt" label="Date of Issue" />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting || isPending}>
            {!currentResult ? 'Publish' : 'Save'}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
