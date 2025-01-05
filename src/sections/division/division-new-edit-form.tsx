import type { IDivisionItem } from 'src/types/division';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewDivisionSchemaType = zod.infer<typeof NewDivisionSchema>;

export const NewDivisionSchema = zod.object({
  name: zod.string().min(1, { message: 'Division name is required!' }),
});

// ----------------------------------------------------------------------

type Props = {
  currentDivision?: IDivisionItem;
};

export function DivisionNewEditForm({ currentDivision }: Props) {
  const router = useRouter();

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentDivision ? 'Division updated!' : 'Division added!');
      router.refresh();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetails = () => (
    <Card>
      <CardHeader title="New Division" />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="Division name" />

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
        {!currentDivision ? 'Add' : 'Save changes'}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails()}
      </Stack>
    </Form>
  );
}
