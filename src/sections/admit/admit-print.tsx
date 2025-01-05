import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

import { Image } from 'src/components/image';

// ----------------------------------------------------------------------

type AdmitPrintProps = {
  admit?: [];
};

export const AdmitPrint = forwardRef<HTMLDivElement, AdmitPrintProps>((_, ref) => {
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
        Centre Code: 101
      </Typography>
      <Image
        src={`${CONFIG.assetsDir}/assets/trash/1021.jpeg`}
        sx={{ width: 70, borderRadius: 0.5 }}
      />
    </Box>
  );

  const renderDetails = () => (
    <Box
      sx={{
        mt: 1,
        alignSelf: 'start',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Stack>
          <Typography variant="h6">Name of Examine:</Typography>
          <Typography variant="h6">Father&apos;s Name:</Typography>
          <Typography variant="h6">Name of Centre:</Typography>
          <Typography variant="h6">Name of Course:</Typography>
        </Stack>
        <Stack>
          <Typography variant="h6">SOHAG MIAH</Typography>
          <Typography variant="h6">MOKBUL HOSSAIN</Typography>
          <Typography variant="h6">Protiva Karigori Proshikkan Kendro</Typography>
          <Typography variant="h6">Certificate in Land Surveyor (Aminship)</Typography>
        </Stack>
      </Box>
      <Stack flexDirection="row" gap={6}>
        <Stack flexDirection="row" gap={8}>
          <Typography variant="h6">Student ID:</Typography>
          <Typography variant="h6">25001021</Typography>
        </Stack>
        <Stack flexDirection="row" gap={1}>
          <Typography variant="h6">Session:</Typography>
          <Typography variant="h6">July - December 2023</Typography>
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
      <Typography variant="h6">Date: 04/01/2025</Typography>
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
