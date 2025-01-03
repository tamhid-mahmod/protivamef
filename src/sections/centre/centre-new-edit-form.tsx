import type { ICentreItem } from 'src/types/centre';

import { z as zod } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

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

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewCentreSchemaType = zod.infer<typeof NewCentreSchema>;

export const NewCentreSchema = zod.object({
  name: zod.string().min(1, { message: 'Centre name is required!' }),
  code: zod
    .string()
    .min(1, { message: 'Centre code is required!' })
    .min(3, { message: 'Code must be at least 3 characters!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  division: zod.string().min(1, { message: 'Division is required!' }),
  district: zod.string().min(1, { message: 'District is required!' }),
  publish: zod.string(),
});

// ----------------------------------------------------------------------

type Props = {
  currentCentre?: ICentreItem;
};

export function CentreNewEditForm({ currentCentre }: Props) {
  const router = useRouter();

  const defaultValues: NewCentreSchemaType = {
    name: '',
    code: '',
    email: '',
    phoneNumber: '',
    address: '',
    division: '',
    district: '',
    publish: '',
  };

  const methods = useForm<NewCentreSchemaType>({
    resolver: zodResolver(NewCentreSchema),
    defaultValues,
    values: currentCentre,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentCentre ? 'Category updated!' : 'Category created!');
      router.push(paths.dashboard.centre.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
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
          <Field.Select name="division" label="Division">
            <MenuItem value="dhaka">Dhaka</MenuItem>
          </Field.Select>

          <Field.Select name="district" label="District">
            <MenuItem value="narsingdi">Narsingdi</MenuItem>
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
                checked={field.value !== 'draft'}
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
        loading={isSubmitting}
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
