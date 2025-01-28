import type { IStudentEducationBackgroundItem } from 'src/types/student';

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
import {
  UpdateStudentEducationSchema,
  type UpdateStudentEducationSchemaType,
} from 'src/schemas/student';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const EXAMINATION_OPTIONS = [
  { value: 'JSC', label: 'JSC' },
  { value: 'SSC', label: 'SSC/Equivalent' },
  { value: 'HSC', label: 'HSC/Equivalent' },
  { value: 'Hons', label: 'Honours/Equivalent' },
];

const BOARD_OPTIONS = [
  'Dhaka',
  'Sylhet',
  'Chittagong',
  'Rajshahi',
  'Comilla',
  'Barishal',
  'Dinajpur',
  'Jessor',
  'Madrasha',
  'Technical',
  'DIBS(Dhaka)',
];

const YEAR_OPTIONS: string[] = Array.from({ length: new Date().getFullYear() - 1972 + 1 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);

// ----------------------------------------------------------------------

type Props = {
  currentEducation?: IStudentEducationBackgroundItem;
};

export function StudentEducationEditForm({ currentEducation }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const defaultValues: UpdateStudentEducationSchemaType = {
    id: '',
    examination: '',
    board: '',
    passYear: '',
  };

  const methods = useForm<UpdateStudentEducationSchemaType>({
    resolver: zodResolver(UpdateStudentEducationSchema),
    defaultValues,
    values: currentEducation,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: handleStudentEducation, isPending } = useMutation({
    mutationFn: async (data: UpdateStudentEducationSchemaType) => {
      await client.student.updateStudentEducation.$post(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student education updated!');
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    handleStudentEducation(data);
  });

  const renderDetails = () => (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Field.Select name="examination" label="Examination">
          {EXAMINATION_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Field.Select>

        <Field.Select name="board" label="Board">
          {BOARD_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Field.Select>

        <Field.Select name="passYear" label="Year">
          {YEAR_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Field.Select>
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
