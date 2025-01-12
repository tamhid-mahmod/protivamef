import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { client } from 'src/lib/trpc';
import { NewDivisionSchema, type NewDivisionSchemaType } from 'src/schemas/division';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export function DivisionNewForm() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const defaultValues: NewDivisionSchemaType = {
    name: '',
  };

  const methods = useForm<NewDivisionSchemaType>({
    resolver: zodResolver(NewDivisionSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: createDivision, isPending } = useMutation({
    mutationFn: async (data: NewDivisionSchemaType) => {
      await client.division.createDivision.$post(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-event-divisions'] });
      toast.success('Division added!');
      reset();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    createDivision(data);
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
        loading={isSubmitting || isPending}
      >
        Add
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
