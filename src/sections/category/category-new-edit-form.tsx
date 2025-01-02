import type { ICategoryItem } from 'src/types/category';

import { z as zod } from 'zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewCategorySchemaType = zod.infer<typeof NewCategorySchema>;

export const NewCategorySchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: schemaHelper
    .editor({ message: 'Description is required!' })
    .min(100, { message: 'Description must be at least 100 characters' })
    .max(500, { message: 'Description must be less than 500 characters' }),
  coverUrl: schemaHelper.file({ message: 'Cover is required!' }),
});

// ----------------------------------------------------------------------

type Props = {
  currentCategory?: ICategoryItem;
};

export function CategoryNewEditForm({ currentCategory }: Props) {
  const router = useRouter();

  const defaultValues: NewCategorySchemaType = {
    name: '',
    description: '',
    coverUrl: null,
  };

  const methods = useForm<NewCategorySchemaType>({
    resolver: zodResolver(NewCategorySchema),
    defaultValues,
    values: currentCategory,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentCategory ? 'Category updated!' : 'Category created!');
      router.push(paths.dashboard.course.category.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(() => {
    setValue('coverUrl', null);
  }, [setValue]);

  const renderDetails = () => (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="Category name" />

        <Field.Text name="description" label="Description" multiline rows={4} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Cover</Typography>
          <Field.Upload
            name="coverUrl"
            maxSize={3145728}
            onDelete={handleRemoveFile}
            onUpload={() => console.log('ON UPLOAD')}
          />
        </Stack>
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
      <Box flexGrow={1} />
      <LoadingButton
        sx={{ alignSelf: 'end' }}
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
      >
        {!currentCategory ? 'Create category' : 'Save changes'}
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
