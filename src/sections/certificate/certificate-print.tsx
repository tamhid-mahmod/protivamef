import type { Theme, CSSObject } from '@mui/material/styles';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

type CertificatePrintProps = {
  certificate?: [];
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
    width: '980px',
    height: '760px',
    backgroundImage: `url(${CONFIG.assetsDir}/assets/page/certificate.jpg)`,
    backgroundSize: '980px 760px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    overflow: 'hidden',
    position: 'relative',
  },
  contentBox: (theme: Theme): CSSObject => ({
    height: 1,
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
  },
  m4: (theme: Theme): CSSObject => ({
    ...styles.baseFont,
    lineHeight: '40px',
    fontSize: theme.typography.pxToRem(28),
    textAlign: 'justify',
    mt: 10,
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

export const CertificatePrint = forwardRef<HTMLDivElement, CertificatePrintProps>((_, ref) => {
  const StyledSpan = ({ children }: { children: React.ReactNode }) => (
    <Typography component="span" sx={styles.s5}>
      {children}
    </Typography>
  );

  const renderCourse = () => <Box sx={styles.m3}>Certificate in Land Surveyor (Aminship) 2023</Box>;

  const renderDetails = () => (
    <Box sx={styles.detailsContainer}>
      <Stack>
        <Typography variant="body2">Student ID: 2023001021</Typography>
        <Typography variant="body2">Session: July - December 2023</Typography>
      </Stack>
    </Box>
  );

  const renderParagraph = () => (
    <Box sx={styles.m4}>
      This is to certify that <StyledSpan>SOHAG MIAH</StyledSpan> Son of{' '}
      <StyledSpan>MOKBUL HOSSAIN</StyledSpan> & <StyledSpan>SHAMIMA BEGUM</StyledSpan> has
      Perticipated in all the semesters from <StyledSpan>July - December 2023</StyledSpan> of{' '}
      <StyledSpan>6 Month</StyledSpan> Duration in{' '}
      <StyledSpan>Certificate in Land Surveyor (Aminship)</StyledSpan> at the Institute of{' '}
      <StyledSpan>Protiva Karigori Proshikkan Kendro</StyledSpan> Code <StyledSpan>101</StyledSpan>{' '}
      under this organization and duly passed the final examination in GPA{' '}
      <StyledSpan>5.00</StyledSpan> on a scale of 5.00 & grade <StyledSpan>A+</StyledSpan>.
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
        mt: 11,
      }}
    >
      <Typography variant="h6" sx={{ textDecoration: 'none', ...styles.h6 }}>
        Date of issue: Dec 18, 2023
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
});
