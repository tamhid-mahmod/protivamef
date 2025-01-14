import type { IDistrictItem } from 'src/types/district';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useRouter } from 'src/routes/hooks';

import { client } from 'src/lib/trpc';
import { useGetDivisions } from 'src/actions/division';
import { NewDistrictSchema, type NewDistrictSchemaType } from 'src/schemas/district';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  currentDistrict?: IDistrictItem;
};

export function DistrictNewEditForm({ open, onClose, currentDistrict }: Props) {
  const router = useRouter();

  const { divisions, divisionsLoading } = useGetDivisions();

  const queryClient = useQueryClient();

  const defaultValues: NewDistrictSchemaType = {
    divisionName: '',
    name: '',
  };

  const methods = useForm<NewDistrictSchemaType>({
    resolver: zodResolver(NewDistrictSchema),
    defaultValues,
    values: currentDistrict,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: handleDistrict, isPending } = useMutation({
    mutationFn: async (data: NewDistrictSchemaType) => {
      await client.district.createDistrict.$post(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['districts'] });
      toast.success(currentDistrict ? 'District updated!' : 'District added!');
      if (!currentDistrict) {
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
    handleDistrict(data);
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { maxWidth: 720 } }}
    >
      <DialogTitle>{currentDistrict ? 'Update District' : 'New District'}</DialogTitle>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Division name</Typography>
              <Field.Autocomplete
                name="divisionName"
                autoHighlight
                options={divisions.map(({ name }) => name)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                disabled={divisionsLoading}
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">District name</Typography>
              <Field.Text name="name" />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting || isPending}>
            {!currentDistrict ? 'Add' : 'Update'}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
