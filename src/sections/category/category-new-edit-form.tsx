import type { ICategoryItem } from 'src/types/category';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { client } from 'src/lib/trpc';
import { uploadImageToS3 } from 'src/actions/s3';
import {
  NewCategorySchema,
  type NewCategorySchemaType,
  type UpdateCategorySchemaType,
} from 'src/schemas/category';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  currentCategory?: ICategoryItem;
};

export function CategoryNewEditForm({ currentCategory }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

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

  const handleUploadImage = useCallback(async () => {
    try {
      const file = methods.getValues('coverUrl');

      const formData = new FormData();
      formData.append('file', file as File);

      const imageUrl = await uploadImageToS3(formData, {
        key: 'categories',
      });

      return imageUrl;
    } catch {
      throw new Error('Failed to upload cover!');
    }
  }, [methods]);

  const { mutate: handleCategory, isPending } = useMutation({
    mutationFn: async (data: UpdateCategorySchemaType | NewCategorySchemaType) => {
      if ('categoryId' in data && currentCategory) {
        await client.category.updateCategory.$post(data);
      } else {
        await client.category.createCategory.$post(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(currentCategory ? 'Category updated!' : 'Category added!');
      if (!currentCategory) {
        reset();
        router.push(paths.dashboard.course.category.root);
      }
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentCategory?.coverUrl !== data.coverUrl) {
        const imageUrl = await handleUploadImage();
        if (imageUrl) {
          data.coverUrl = imageUrl;
        }
      }

      if (currentCategory) {
        handleCategory({ categoryId: currentCategory.id, ...data });
      } else {
        handleCategory(data);
      }
    } catch (error: any) {
      toast.error(error.message);
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
            helperText="16:9 aspect ratio recomended"
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
        loading={isSubmitting || isPending}
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
