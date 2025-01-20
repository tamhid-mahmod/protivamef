import type { ICourseItem } from 'src/types/course';

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
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { client } from 'src/lib/trpc';
import { useGetCategories } from 'src/actions/category';
import { NewCourseSchema, type NewCourseSchemaType } from 'src/schemas/course';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const DURATION = Array.from({ length: 12 }, (_, i) =>
  i + 1 === 12 ? '1 Year' : `${i + 1} Month${i + 1 > 1 ? 's' : ''}`
);

const QUALIFICATION = [
  { value: 'JSC', label: 'JSC' },
  { value: 'SSC', label: 'SSC/Equivalent' },
  { value: 'HSC', label: 'HSC/Equivalent' },
  { value: 'Hons', label: 'Honours/Equivalent' },
];

// ----------------------------------------------------------------------

type Props = {
  currentCourse?: ICourseItem;
};

export function CourseNewEditForm({ currentCourse }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { categories } = useGetCategories();

  const defaultValues: NewCourseSchemaType = {
    categoryId: '',
    title: '',
    code: '',
    duration: '',
    qualification: '',
    fee: null,
    feeBase: null,
    publish: 'draft',
    description: '',
  };

  const methods = useForm<NewCourseSchemaType>({
    resolver: zodResolver(NewCourseSchema),
    defaultValues,
    values: currentCourse,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: handleCourse, isPending } = useMutation({
    mutationFn: async (data: NewCourseSchemaType) => {
      await client.course.createCourse.$post(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success(currentCourse ? 'Course updated!' : 'Course added!');
      if (!currentCourse) {
        reset();
      }
      router.refresh();
      router.push(paths.dashboard.course.root);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    handleCourse(data);
  });

  const renderDetails = () => (
    <Card>
      <CardHeader title="Details" subheader="Title, content..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="title" label="Course title" />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Content</Typography>
          <Field.Editor name="description" sx={{ maxHeight: 480 }} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = () => (
    <Card>
      <CardHeader title="Properties" subheader="Code, category, duration..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          sx={{
            rowGap: 3,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          }}
        >
          <Field.Text name="code" label="Course code" />

          <Field.Select name="categoryId" label="Category">
            {categories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Select name="duration" label="Duration">
            {DURATION.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Field.Select>

          <Field.Select name="qualification" label="Qualification">
            {QUALIFICATION.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Field.Select>
        </Box>
      </Stack>
    </Card>
  );

  const renderFees = () => (
    <Card>
      <CardHeader title="Fees" subheader="Fees related inputs" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="fee"
          label="Regular fee"
          placeholder="0.00"
          type="number"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.75 }}>
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    ৳
                  </Box>
                </InputAdornment>
              ),
            },
          }}
        />

        <Field.Text
          name="feeBase"
          label="Base fee"
          placeholder="0.00"
          type="number"
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.75 }}>
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    ৳
                  </Box>
                </InputAdornment>
              ),
            },
          }}
        />
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
        {!currentCourse ? 'Create course' : 'Save changes'}
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails()}
        {renderProperties()}
        {renderFees()}
        {renderActions()}
      </Stack>
    </Form>
  );
}
