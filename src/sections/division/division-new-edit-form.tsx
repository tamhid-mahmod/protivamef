import type { IDivisionItem } from 'src/types/division';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useRouter } from 'src/routes/hooks';

import { client } from 'src/lib/trpc';
import {
  NewDivisionSchema,
  type NewDivisionSchemaType,
  type UpdateDivisionSchemaType,
} from 'src/schemas/division';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  currentDivision?: IDivisionItem;
};

export function DivisionNewEditForm({ open, onClose, currentDivision }: Props) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const defaultValues: NewDivisionSchemaType = {
    name: '',
  };

  const methods = useForm<NewDivisionSchemaType>({
    resolver: zodResolver(NewDivisionSchema),
    defaultValues,
    values: currentDivision,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: handleDivision, isPending } = useMutation({
    mutationFn: async (data: UpdateDivisionSchemaType | NewDivisionSchemaType) => {
      if ('divisionId' in data && currentDivision) {
        await client.division.updateDivision.$post(data);
      } else {
        await client.division.createDivision.$post(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['divisions'] });
      toast.success(currentDivision ? 'Division updated!' : 'Divisoin added!');
      if (!currentDivision) {
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
    if (currentDivision) {
      handleDivision({ divisionId: currentDivision.id, ...data });
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
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <DialogTitle>{currentDivision ? 'Update Division' : 'New Division'}</DialogTitle>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Stack sx={{ mt: 1 }}>
            <Field.Text name="name" label="Division name" disabled={currentDivision && isPending} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting || isPending}>
            {!currentDivision ? 'Add' : 'Update'}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
