import type { Theme, CSSObject } from '@mui/material/styles';
import type { ICertificateItem } from 'src/types/certificate';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fDate, fYear } from 'src/utils/format-time';
import { fGrade, fDecimal } from 'src/utils/format-number';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

type CertificatePrintProps = {
  certificate?: ICertificateItem;
};

type PritnItemStyles = {
  baseFont: CSSObject;
  certificateContainer: CSSObject;
  detailsContainer: CSSObject;
  contentBox: (theme: Theme) => CSSObject;
  m3: (theme: Theme) => CSSObject;
  m4: (theme: Theme) => CSSObject;
  s5: (theme: Theme) => CSSObject;
  h6: (theme: Theme) => CSSObject;
};

const styles: PritnItemStyles = {
  baseFont: {
    fontFamily: '"MariageD", sans-serif',
    fontWeight: 'lighter',
  },
  certificateContainer: {
    backgroundImage: `url(${CONFIG.assetsDir}/assets/page/certificate.jpg)`,
    backgroundSize: '980px 760px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    overflow: 'hidden',
    position: 'relative',
  },
  contentBox: (theme: Theme): CSSObject => ({
    width: '980px',
    height: '760px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(8.5, 8.2, 10.2, 8.5),
  }),
  m3: (theme: Theme): CSSObject => ({
    ...styles.baseFont,
    lineHeight: 64 / 48,
    fontSize: theme.typography.pxToRem(30),
    textAlign: 'center',
    mt: 10,
  }),
  detailsContainer: {
    width: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
    mt: 3.5,
    mb: 9,
  },
  m4: (theme: Theme): CSSObject => ({
    ...styles.baseFont,
    lineHeight: '40px',
    fontSize: theme.typography.pxToRem(28),
    minHeight: 315,
  }),
  s5: (theme: Theme): CSSObject => ({
    fontSize: theme.typography.pxToRem(22),
    lineHeight: '40px',
    fontWeight: 600,
    fontStyle: 'italic',
  }),
  h6: (theme: Theme): CSSObject => ({
    fontSize: theme.typography.pxToRem(18.72),
    textDecoration: 'overline',
  }),
};

export const CertificatePrint = forwardRef<HTMLDivElement, CertificatePrintProps>(
  ({ certificate }, ref) => {
    const StyledSpan = ({ children }: { children: React.ReactNode }) => (
      <Typography component="span" sx={styles.s5}>
        {children}
      </Typography>
    );

    const renderCourse = () => (
      <Box sx={styles.m3}>
        {certificate?.student?.course?.title} {fYear(certificate?.createdAt)}
      </Box>
    );

    const renderDetails = () => (
      <Box sx={styles.detailsContainer}>
        <Stack>
          <Typography variant="body2">Student ID: {certificate?.student?.studentAId}</Typography>
          <Typography variant="body2">Session: {certificate?.student?.session}</Typography>
        </Stack>
      </Box>
    );

    const renderParagraph = () => (
      <Box sx={styles.m4}>
        This is to certify that{' '}
        <StyledSpan>{certificate?.student?.fullName.toLocaleUpperCase()}</StyledSpan> Son of{' '}
        <StyledSpan>{certificate?.student?.fatherName.toLocaleUpperCase()}</StyledSpan> &{' '}
        <StyledSpan>{certificate?.student?.motherName.toLocaleUpperCase()}</StyledSpan> has
        Perticipated in all the semesters from{' '}
        <StyledSpan>{certificate?.student?.session}</StyledSpan> of{' '}
        <StyledSpan>{certificate?.student?.course?.duration}</StyledSpan> Duration in{' '}
        <StyledSpan>{certificate?.student?.course?.title}</StyledSpan> at the Institute of{' '}
        <StyledSpan>{certificate?.student?.centre?.name}</StyledSpan> Code{' '}
        <StyledSpan>{certificate?.student?.centre?.code}</StyledSpan> under this organization and
        duly passed the final examination in GPA{' '}
        <StyledSpan>{fDecimal(certificate?.mark)}</StyledSpan> on a scale of 5.00 & grade{' '}
        <StyledSpan>{fGrade(certificate?.mark)}</StyledSpan>.
      </Box>
    );

    const renderSignature = () => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontStyle: 'italic',
        }}
      >
        <Typography variant="h6" sx={{ textDecoration: 'none', ...styles.h6 }}>
          Date of issue: {fDate(certificate?.createdAt)}
        </Typography>

        <Stack>
          <Typography variant="h6" sx={styles.h6}>
            Controller of Examinations
          </Typography>
        </Stack>

        <Stack>
          <Typography variant="h6" sx={styles.h6}>
            Chairman
          </Typography>
        </Stack>
      </Box>
    );

    return (
      <Box sx={styles.certificateContainer}>
        <Box ref={ref} sx={styles.contentBox}>
          <Box mx={2}>
            {renderCourse()}
            {renderDetails()}
            {renderParagraph()}
            {renderSignature()}
          </Box>
        </Box>
      </Box>
    );
  }
);
