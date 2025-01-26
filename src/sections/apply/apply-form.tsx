import type { IDistrictItem } from 'src/types/district';
import type { ICentreItem, ICentreCourseItem } from 'src/types/centre';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack, { type StackProps } from '@mui/material/Stack';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetDivisions } from 'src/actions/division';
import { getDistrictsByDivision } from 'src/actions/district-ssr';
import { NewStudentSchema, type NewStudentSchemaType } from 'src/schemas/student';
import { getCoursesByCentre, getCentresByDivisionAndDistrict } from 'src/actions/centre-ssr';

import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

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

const YEAR_OPTIONS = Array.from(
  { length: new Date().getFullYear() - 1972 + 1 },
  (_, i) => new Date().getFullYear() - i
);

// ----------------------------------------------------------------------

export default function ApplyForm() {
  const [districts, setDistricts] = useState<IDistrictItem[]>([]);
  const [centres, setCentres] = useState<ICentreItem[]>([]);
  const [courses, setCourses] = useState<ICentreCourseItem[]>([]);

  // loading
  const [districtLoading, setDistrictLoading] = useState(false);
  const [centreLoading, setCentreLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);

  const { divisions, divisionsLoading } = useGetDivisions();

  const defaultValues: NewStudentSchemaType = {
    // introduction
    fullName: '',
    dateOfBirth: null,
    gender: '',
    address: '',
    religion: '',
    fatherName: '',
    motherName: '',
    examination: '',
    board: '',
    year: '',
    roll: '',
    result: '',
    division: '',
    district: '',
    centre: '',
    course: '',
    imageUrl: '',
    iAgree: false,

    // optional
    email: '',
    phoneNumber: '',
  };

  const methods = useForm({
    resolver: zodResolver(NewStudentSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  // handle district
  useEffect(() => {
    if (values.division) {
      setDistrictLoading(true);

      setValue('district', '');
      setValue('centre', '');
      setValue('course', '');
      setDistricts([]);
      getDistrictsByDivision(values.division)
        .then((data) => {
          setDistricts(data.districts);
        })
        .finally(() => {
          setDistrictLoading(false);
        });
    }
  }, [values.division, setValue]);

  // handle centre
  useEffect(() => {
    if (values.division && values.district) {
      setCentreLoading(true);

      setValue('centre', '');
      setValue('course', '');
      setCentres([]);
      getCentresByDivisionAndDistrict(values.division, values.district)
        .then((data) => {
          setCentres(data.centres);
        })
        .finally(() => {
          setCentreLoading(false);
        });
    }
  }, [values.division, values.district, setValue]);

  // handle course
  useEffect(() => {
    if (values.division && values.district && values.centre) {
      setCourseLoading(true);

      setValue('course', '');
      setCourses([]);
      getCoursesByCentre(values.centre)
        .then((data) => {
          setCourses(data.centreCourses);
        })
        .finally(() => {
          setCourseLoading(false);
        });
    }
  }, [values.division, values.district, values.centre, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    console.log('DATA', data);
    reset();
  });

  const renderIntroduction = () => (
    <Block label="Intruduction">
      <Stack spacing={2}>
        <Field.Text name="fullName" label="Full Name" />

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
        </Box>
      </Stack>
    </Block>
  );

  const renderOptional = () => (
    <Block label="(Optional)">
      <Stack spacing={2}>
        <Box
          sx={{
            rowGap: 2,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <Field.Text name="email" label="Email address" />

          <Field.Phone fullWidth name="phoneNumber" label="Contact number" country="BD" />
        </Box>

        <Field.Text name="address" label="Address" />

        <Field.Text name="religion" label="Religion" />
      </Stack>
    </Block>
  );

  const renderParentsInformation = () => (
    <Block label="Parents Information">
      <Box
        sx={{
          rowGap: 2,
          columnGap: 2,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
        }}
      >
        <Field.Text name="fatherName" label="Father's name" />

        <Field.Text name="motherName" label="Mother's name" />
      </Box>
    </Block>
  );

  const renderEducation = () => (
    <Block label="Education">
      <Stack spacing={2}>
        <Box
          sx={{
            rowGap: 2,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
          }}
        >
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

          <Field.Select name="year" label="Year">
            {YEAR_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Field.Select>
        </Box>

        <Box
          sx={{
            rowGap: 2,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <Field.Text name="roll" label="Roll" />

          <Field.Text name="result" label="Result" />
        </Box>
      </Stack>
    </Block>
  );

  const renderApplyCentre = () => (
    <Block label="Choose which center you want to apply">
      <Stack spacing={2}>
        <Box
          sx={{
            rowGap: 2,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <Field.Select name="division" label="Divison">
            {divisionsLoading ? (
              <MenuItem>Loading....</MenuItem>
            ) : (
              divisions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))
            )}
          </Field.Select>

          <Field.Select name="district" label="District">
            {districtLoading ? (
              <MenuItem>Loading....</MenuItem>
            ) : (
              districts.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))
            )}
          </Field.Select>
        </Box>

        <Field.Select name="centre" label="Centre">
          {centreLoading ? (
            <MenuItem>Loading....</MenuItem>
          ) : (
            centres.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))
          )}
        </Field.Select>

        <Field.Select name="course" label="Course">
          {courseLoading ? (
            <MenuItem>Loading....</MenuItem>
          ) : (
            courses.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                ({option.course.code}) {option.course.title}
              </MenuItem>
            ))
          )}
        </Field.Select>
      </Stack>
    </Block>
  );

  const renderUploadhoto = () => (
    <Block label="Passport size photo">
      <Field.Upload
        name="imageUrl"
        maxSize={3145728}
        onDelete={() => setValue('imageUrl', null, { shouldValidate: true })}
      />
    </Block>
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
        Submit
      </LoadingButton>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <Stack spacing={1}>
          {renderIntroduction()}
          {renderOptional()}
          {renderParentsInformation()}
          {renderEducation()}
          {renderApplyCentre()}
        </Stack>

        <Stack spacing={1}>
          {renderUploadhoto()}

          <Field.Checkbox
            name="iAgree"
            label={
              <span>
                I accept{' '}
                <Link component={RouterLink} href={paths.rulesandRegulation}>
                  Rules & Regulations
                </Link>{' '}
                and given Information above are Correct
              </span>
            }
          />

          {renderActions()}
        </Stack>
      </Box>
    </Form>
  );

  // ----------------------------------------------------------------------

  interface BlockProps extends StackProps {
    label: string;
    children: React.ReactNode;
  }

  function Block({ label, sx, children }: BlockProps) {
    return (
      <Stack spacing={1} sx={{ width: 1, ...sx }}>
        <Typography
          variant="caption"
          sx={{
            textAlign: 'right',
            fontStyle: 'italic',
            color: 'text.disabled',
          }}
        >
          {label}
        </Typography>
        {children}
      </Stack>
    );
  }
}
