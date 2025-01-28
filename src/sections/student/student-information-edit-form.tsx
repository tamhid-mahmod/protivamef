import type { IStudentAllItem } from 'src/types/student';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { client } from 'src/lib/trpc';
import { uploadImageToS3 } from 'src/actions/s3';
import {
  UpdateStudentInformationSchema,
  type UpdateStudentInformationSchemaType,
} from 'src/schemas/student';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'registered', label: 'Registered' },
  { value: 'rejected', label: 'Rejected' },
];

// ----------------------------------------------------------------------

type Props = {
  currentStudent?: IStudentAllItem;
};

export function StudentInformationEditForm({ currentStudent }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const defaultValues: UpdateStudentInformationSchemaType = {
    id: '',
    fullName: '',
    dateOfBirth: null,
    gender: '',
    address: '',
    religion: '',
    fatherName: '',
    motherName: '',
    status: 'pending',
    imageUrl: null,
    session: '',
  };

  const methods = useForm<UpdateStudentInformationSchemaType>({
    resolver: zodResolver(UpdateStudentInformationSchema),
    defaultValues,
    values: currentStudent,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleUploadImage = useCallback(async () => {
    try {
      const file = methods.getValues('imageUrl');

      const formData = new FormData();
      formData.append('file', file as File);

      const imageUrl = await uploadImageToS3(formData, {
        key: 'students',
      });

      return imageUrl;
    } catch {
      throw new Error('Failed to upload image!');
    }
  }, [methods]);

  const { mutate: handleStudent, isPending } = useMutation({
    mutationFn: async (data: UpdateStudentInformationSchemaType) => {
      await client.student.updateStudentInformation.$post(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student information updated!');
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentStudent?.imageUrl !== data.imageUrl) {
        const imageUrl = await handleUploadImage();
        if (imageUrl) {
          data.imageUrl = imageUrl;
        }
      }
      handleStudent(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  const renderDetails = () => (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Field.Text name="fullName" label="Full name" />

        <Box
          sx={{
            rowGap: 2,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <Field.DatePicker name="dateOfBirth" label="Date of Birth" />

          <Field.Select name="gender" label="Gender">
            {GENDER_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Text name="email" label="Email address" />

          <Field.Phone fullWidth name="phoneNumber" label="Contact number" country="BD" />
        </Box>

        <Field.Text name="address" label="Address" />

        <Box
          sx={{
            rowGap: 2,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <Field.Text name="religion" label="Religion" />

          <Field.Select name="status" label="Status">
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Text name="fatherName" label="Father's name" />

          <Field.Text name="motherName" label="Mother's name" />
        </Box>

        <Field.Text name="session" label="Session" />

        <Field.Upload
          name="imageUrl"
          maxSize={3145728}
          onDelete={() => setValue('imageUrl', null, { shouldValidate: true })}
        />
      </Stack>

      {renderActions()}
    </Card>
  );

  const renderActions = () => (
    <Box
      sx={{
        mt: 2,
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
        Save
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
