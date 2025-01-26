import { varAlpha } from 'minimal-shared/utils';

import Container from '@mui/material/Container';
import Box, { type BoxProps } from '@mui/material/Box';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export function CustomBreadcrumbsBackground({ children, sx, ...other }: BoxProps) {
  return (
    <Box
      component="section"
      sx={[
        (theme) => ({
          height: 240,
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            ...theme.mixins.bgGradient({
              images: [
                `linear-gradient(135deg, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)}, ${varAlpha(theme.vars.palette.background.defaultChannel, 0.9)})`,
                `url(${CONFIG.assetsDir}/assets/background/background-3-blur.webp)`,
              ],
            }),
            transform: 'scaleX(-1)', // Flip background horizontally
            transformOrigin: 'center',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
