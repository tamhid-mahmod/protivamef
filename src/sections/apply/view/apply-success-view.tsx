'use client';

import type { IStudentAllItem } from 'src/types/student';

import dynamic from 'next/dynamic';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ApplyDetails } from '../apply-details';

// ----------------------------------------------------------------------

const ApplyPDFDownload = dynamic(() => import('../apply-pdf').then((mod) => mod.ApplyPDFDownload), {
  ssr: false,
});

// ----------------------------------------------------------------------

type Props = {
  student?: IStudentAllItem;
};

export function ApplySuccessView({ student }: Props) {
  const renderDownloadButton = () => <ApplyPDFDownload student={student} />;

  return (
    <Container sx={{ my: 10 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4"> Application Details </Typography>

        {renderDownloadButton()}
      </Stack>

      <Divider sx={{ my: 5 }} />

      <ApplyDetails student={student} />

      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {renderDownloadButton()}
      </Box>
    </Container>
  );
}
