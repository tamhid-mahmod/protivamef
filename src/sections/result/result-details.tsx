import type { IResultItem } from 'src/types/result';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fDecimal } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = {
  result?: IResultItem;
};

export const ResultDetails = forwardRef<HTMLDivElement, Props>(({ result }, ref) => (
  <Card ref={ref} sx={{ py: 5, px: 3 }}>
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        component="img"
        alt="Result logo"
        src="/logo/logo-single.svg"
        sx={{ width: 80, height: 80 }}
      />

      <Stack spacing={0.5} sx={{ typography: 'body2', textAlign: 'center' }}>
        <Typography variant="h6">Protiva Multi Education Foundation</Typography>
        Approved by BTEB & Government of the People&apos;s Republic of Bangladesh
        <Box
          component="span"
          sx={[
            (theme) => ({
              color: theme.vars.palette.warning.main,
            }),
          ]}
        >
          (Govt. Reg. No-S-12757, BTEB Code: 52067, 52103)
        </Box>
      </Stack>
    </Box>

    <Typography
      variant="subtitle1"
      sx={{ textDecoration: 'underline', textAlign: 'center', mt: 3 }}
    >
      Result
    </Typography>

    <Box sx={{ mt: 4, border: 1, p: 1 }}>
      <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'body2' }}>
        <Typography component="div" variant="body2" sx={{ minWidth: 99 }}>
          Name:
        </Typography>
        {result?.student?.fullName}
      </Stack>

      <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'body2' }}>
        <Typography component="div" variant="body2" sx={{ minWidth: 99 }}>
          Father&apos;s name:
        </Typography>
        {result?.student?.fatherName}
      </Stack>

      <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'body2' }}>
        <Typography component="div" variant="body2" sx={{ minWidth: 99 }}>
          Mother&apos;s name:
        </Typography>
        {result?.student?.motherName}
      </Stack>

      <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'body2' }}>
        <Typography component="div" variant="body2" sx={{ minWidth: 99 }}>
          Centre:
        </Typography>
        {result?.student?.centre?.name}
      </Stack>

      <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'body2' }}>
        <Typography component="div" variant="body2" sx={{ minWidth: 99 }}>
          Centre code:
        </Typography>
        {result?.student?.centre?.code}
      </Stack>

      <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'body2' }}>
        <Typography component="div" variant="body2" sx={{ minWidth: 99 }}>
          Course:
        </Typography>
        {result?.student?.course?.title}
      </Stack>

      <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'body2' }}>
        <Typography component="div" variant="body2" sx={{ minWidth: 99 }}>
          Course code:
        </Typography>
        {result?.student?.course?.code}
      </Stack>

      <Stack sx={{ gap: 1, flexDirection: 'row', typography: 'body2' }}>
        <Typography component="div" variant="body2" sx={{ minWidth: 99 }}>
          Grade:
        </Typography>
        {fDecimal(result?.mark)}
      </Stack>
    </Box>
  </Card>
));
