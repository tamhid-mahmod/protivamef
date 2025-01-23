import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import { client } from 'src/lib/trpc';
import { useGetCourses } from 'src/actions/course';
import { useGetAssignedCourses } from 'src/actions/centre';
import { NewCentreCourseSchema, type NewCentreCourseSchemaType } from 'src/schemas/centre';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  centreId: string;
};

export function CentreCourseForm({ centreId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { courses } = useGetCourses();
  const { assignedCourses } = useGetAssignedCourses(centreId);

  const availableCourses = courses.filter(
    (course) => !assignedCourses.some((assigned) => assigned.courseId === course.id)
  );

  const defaultValues: NewCentreCourseSchemaType = {
    centreId,
    courses: [],
  };

  const methods = useForm<NewCentreCourseSchemaType>({
    resolver: zodResolver(NewCentreCourseSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: handleCentreCourse, isPending } = useMutation({
    mutationFn: async (data: NewCentreCourseSchemaType) => {
      await client.centre.assignCentreCourse.$post(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['centre-courses'] });
      toast.success('Signed courses!');
      reset();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    handleCentreCourse(data);
  });

  const renderDetails = () => (
    <Card>
      <CardHeader title="Courses" sx={{ mb: 2 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Autocomplete
          name="courses"
          placeholder="+ Codes"
          multiple
          disableCloseOnSelect
          options={availableCourses}
          getOptionLabel={(option) => option.id}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option.id}>
              <Checkbox key={option.title} size="small" disableRipple checked={selected} />(
              {option.code}) {option.title}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.id}
                label={option.code}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />
      </Stack>
      {renderActions()}
    </Card>
  );

  const renderActions = () => (
    <Box
      sx={{
        padding: (theme) => theme.spacing(0, 3, 3, 3),
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
        Signed
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }}>{renderDetails()}</Stack>
    </Form>
  );
}
