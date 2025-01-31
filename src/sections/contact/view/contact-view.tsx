'use client';

import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';

import { ContactDetails } from '../contact-details';

// ----------------------------------------------------------------------

export function ContactView() {
  return (
    <Container component="section" sx={{ py: 5 }}>
      <Grid container spacing={{ md: 3 }} sx={{ alignItems: 'flex-start' }}>
        <Grid size={12}>
          <ContactDetails />
        </Grid>
      </Grid>
    </Container>
  );
}
