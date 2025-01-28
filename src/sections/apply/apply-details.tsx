import type { IStudentItem } from 'src/types/student';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  student?: IStudentItem;
};

export function ApplyDetails({ student }: Props) {
  const renderFooter = () => (
    <Box
      sx={{
        py: 3,
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <div>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          NOTES
        </Typography>
        <Typography variant="body2" color="warning">
          Before closing this tab, please ensure you download the application details.
        </Typography>
      </div>

      <Box sx={{ flexGrow: { md: 1 }, textAlign: { md: 'right' } }}>
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          Have a question?
        </Typography>
        <Typography variant="body2">support@protivamef.com</Typography>
      </Box>
    </Box>
  );

  return (
    <Card sx={{ pt: 5, px: 5 }}>
      <Box
        sx={{
          rowGap: 5,
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
        }}
      >
        <Box
          component="img"
          alt="Invoice logo"
          src="/logo/logo-single.svg"
          sx={{ width: 100, height: 100 }}
        />

        <Stack spacing={1} sx={{ alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
          <Label
            variant="soft"
            color={
              (student?.status === 'registered' && 'success') ||
              (student?.status === 'pending' && 'warning') ||
              'default'
            }
          >
            {student?.status}
          </Label>

          <Typography variant="h6">Student ID: {student?.rollNumber}</Typography>
        </Stack>

        <Stack sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Student
          </Typography>
          {student?.fullName}
          <br />
          {student?.address}
          <br />
          Phone: {student?.phoneNumber}
          <br />
          Father&apos;s name: {student?.fatherName}
          <br />
          Mother&apos;s name: {student?.motherName}
          <br />
        </Stack>

        <Stack sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Centre
          </Typography>
          {student?.centre?.name}
          <br />
          {student?.centre?.address}
          <br />
          Course code: {student?.course?.code}
          <br />
          Course: {student?.course?.title}
          <br />
          Phone: {student?.centre?.phoneNumber}
          <br />
        </Stack>

        <Stack sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Date application
          </Typography>
          {fDate(student?.createdAt)}
        </Stack>
      </Box>

      <Divider sx={{ mt: 5, borderStyle: 'dashed' }} />

      {renderFooter()}
    </Card>
  );
}
