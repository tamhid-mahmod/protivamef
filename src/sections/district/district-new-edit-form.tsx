import type { IDistrictsWithDivisionItem } from 'src/types/district';

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
import {
  NewDistrictSchema,
  type NewDistrictSchemaType,
  type UpdateDistrictSchemaType,
} from 'src/schemas/district';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  currentDistrict?: IDistrictsWithDivisionItem;
};

export function DistrictNewEditForm({ open, onClose, currentDistrict }: Props) {
  const router = useRouter();

  const { divisions, divisionsLoading } = useGetDivisions();

  const queryClient = useQueryClient();

  const defaultValues: NewDistrictSchemaType = {
    division: { id: '', name: '' },
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
    mutationFn: async (data: UpdateDistrictSchemaType | NewDistrictSchemaType) => {
      if ('districtId' in data && currentDistrict) {
        await client.district.updateDistrict.$post(data);
      } else {
        await client.district.createDistrict.$post(data);
      }
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
    if (currentDistrict) {
      handleDistrict({ districtId: currentDistrict.id, ...data });
    } else {
      handleDistrict(data);
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
      <DialogTitle>{currentDistrict ? 'Update District' : 'New District'}</DialogTitle>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Division name</Typography>
              <Field.Autocomplete
                name="division"
                autoHighlight
                options={divisions}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
                disabled={divisionsLoading || !!currentDistrict}
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
