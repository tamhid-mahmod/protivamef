import type { ICentreItem } from 'src/types/centre';

import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { client } from 'src/lib/trpc';
import { useGetDivisionsWithDistricts } from 'src/actions/division';
import {
  NewCentreSchema,
  type NewCentreSchemaType,
  type UpdateCentreSchemaType,
} from 'src/schemas/centre';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  currentCentre?: ICentreItem;
};

export function CentreNewEditForm({ currentCentre }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { divisionsWithDistricts } = useGetDivisionsWithDistricts();

  const defaultValues: NewCentreSchemaType = {
    name: '',
    code: '',
    email: '',
    phoneNumber: '',
    address: '',
    divisionId: '',
    districtId: '',
    publish: 'draft',
  };

  const methods = useForm<NewCentreSchemaType>({
    resolver: zodResolver(NewCentreSchema),
    defaultValues,
    values: currentCentre,
  });

  const {
    reset,
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const selectedDivisionId = watch('divisionId');

  const districts = useMemo(() => {
    const selectedDivision = divisionsWithDistricts.find(
      (division) => division.id === selectedDivisionId
    );
    return selectedDivision?.districts || [];
  }, [selectedDivisionId, divisionsWithDistricts]);

  const { mutate: handleCentre, isPending } = useMutation({
    mutationFn: async (data: UpdateCentreSchemaType | NewCentreSchemaType) => {
      if ('centreId' in data && currentCentre) {
        await client.centre.updateCentre.$post(data);
      } else {
        await client.centre.createCentre.$post(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['centres'] });
      toast.success(currentCentre ? 'Centre updated!' : 'Centre added!');
      if (!currentCentre) {
        reset();
      }
      router.refresh();
      router.push(paths.dashboard.centre.root);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (currentCentre) {
      handleCentre({ centreId: currentCentre.id, ...data });
    } else {
      handleCentre(data);
    }
  });

  const renderDetails = () => (
    <Card>
      <CardHeader title="Details" subheader="Name, code, address..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="Centre name" />

        <Field.Text name="code" label="Centre code" />

        <Box
          sx={{
            rowGap: 3,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          }}
        >
          <Field.Text name="email" label="Email address" />

          <Field.Phone name="phoneNumber" label="Contact number" country="BD" />
        </Box>

        <Field.Text name="address" label="Address" />

        <Box
          sx={{
            rowGap: 3,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          }}
        >
          <Field.Select name="divisionId" label="Division">
            {divisionsWithDistricts.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Select name="districtId" label="District">
            {districts.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Field.Select>
        </Box>
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
      <FormControlLabel
        control={
          <Controller
            name="publish"
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                checked={field.value === 'published'}
                onChange={(event) => field.onChange(event.target.checked ? 'published' : 'draft')}
              />
            )}
          />
        }
        label="Publish"
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <Box sx={{ flexGrow: 1 }} />

      <LoadingButton
        sx={{ alignSelf: 'end' }}
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting || isPending}
      >
        {!currentCentre ? 'Create centre' : 'Save changes'}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails()}
        {renderActions()}
      </Stack>
    </Form>
  );
}
