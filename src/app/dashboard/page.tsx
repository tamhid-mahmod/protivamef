import type { Metadata } from 'next';

import { Box, Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <Box
      sx={{
        width: 1,
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2">Hello, chief 😊</Typography>
    </Box>
  );
}
