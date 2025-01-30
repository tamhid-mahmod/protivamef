import type { IStudentAllItem } from 'src/types/student';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { CONFIG } from 'src/global-config';

import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

type AdmitPrintProps = {
  admit?: IStudentAllItem;
};

export const AdmitPrint = forwardRef<HTMLDivElement, AdmitPrintProps>(({ admit }, ref) => {
  const renderHead = () => (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'end',
        mt: 4.5,
        mr: 4.5,
        gap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontStyle: 'italic', mt: 8.5 }}>
        Centre Code: {admit?.centre?.code}
      </Typography>
      <Image src={admit?.imageUrl || ''} sx={{ width: 70, height: 70, borderRadius: 0.5 }} />
    </Box>
  );

  const renderDetails = () => (
    <Box
      sx={{
        mt: 1,
        alignSelf: 'start',
      }}
    >
      <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'h6' }}>
        <Typography component="div" variant="h6" sx={{ minWidth: 153 }}>
          Name of Examine:
        </Typography>
        {admit?.fullName.toLocaleUpperCase()}
      </Stack>

      <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'h6' }}>
        <Typography component="div" variant="h6" sx={{ minWidth: 153 }}>
          Father&apos;s name:
        </Typography>
        {admit?.fatherName.toLocaleUpperCase()}
      </Stack>

      <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'h6' }}>
        <Typography component="div" variant="h6" sx={{ minWidth: 153 }}>
          Name of Centre:
        </Typography>
        {admit?.centre?.name}
      </Stack>

      <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'h6' }}>
        <Typography component="div" variant="h6" sx={{ minWidth: 153 }}>
          Name of Course:
        </Typography>
        {admit?.course?.title}
      </Stack>

      <Stack flexDirection="row" gap={6}>
        <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'h6' }}>
          <Typography component="div" variant="h6" sx={{ minWidth: 153 }}>
            Student ID:
          </Typography>
          {admit?.studentAId}
        </Stack>
        <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'h6' }}>
          <Typography component="div" variant="h6">
            Session:
          </Typography>
          {admit?.session}
        </Stack>
      </Stack>
    </Box>
  );

  const renderFooter = () => (
    <Box
      sx={{
        width: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h6">Date: {fDate(new Date())}</Typography>
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          lineHeight: 1,
          mt: 2,
        }}
      >
        Exam Controller(Incharge) <br />
        PMEF
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundImage: `url(${CONFIG.assetsDir}/assets/page/admit.jpg)`,
        backgroundSize: '865px 354px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        ref={ref}
        sx={{
          width: '865px',
          height: '354px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 4,
          fontStyle: 'italic',
        }}
      >
        {renderHead()}

        {renderDetails()}

        {renderFooter()}
      </Box>
    </Box>
  );
});
