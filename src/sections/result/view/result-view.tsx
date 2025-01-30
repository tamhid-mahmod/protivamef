'use client';

import Container from '@mui/material/Container';

import { CustomBreadcrumbs, CustomBreadcrumbsBackground } from 'src/components/custom-breadcrumbs';

import { ResultForm } from '../result-form';

// ----------------------------------------------------------------------

export function ResultView() {
  return (
    <>
      <CustomBreadcrumbsBackground>
        <CustomBreadcrumbs
          heading="Result"
          links={[{ name: 'Home', href: '/' }, { name: 'Result' }]}
        />
      </CustomBreadcrumbsBackground>

      <Container sx={{ my: 10 }}>
        <ResultForm />
      </Container>
    </>
  );
}
