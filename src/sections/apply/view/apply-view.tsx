'use client';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CustomBreadcrumbs, CustomBreadcrumbsBackground } from 'src/components/custom-breadcrumbs';

import ApplyForm from '../apply-form';

// ----------------------------------------------------------------------

export function ApplyView() {
  return (
    <>
      <CustomBreadcrumbsBackground>
        <CustomBreadcrumbs
          heading="Apply online"
          links={[{ name: 'Home', href: '/' }, { name: 'Apply' }, { name: 'Apply Online' }]}
        />
      </CustomBreadcrumbsBackground>

      <Container sx={{ my: 10 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4"> Application Form </Typography>
        </Stack>

        <Divider sx={{ my: 5 }} />

        <ApplyForm />
      </Container>
    </>
  );
}
