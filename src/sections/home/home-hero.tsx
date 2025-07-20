import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';
import type { MotionProps, MotionValue, SpringOptions } from 'framer-motion';

import { useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { m, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Carousel, useCarousel } from 'src/components/carousel';
import { varFade, MotionContainer } from 'src/components/animate';

import { HeroBackground } from './components/hero-background';

// ----------------------------------------------------------------------

const smKey: Breakpoint = 'sm';
const mdKey: Breakpoint = 'md';
const lgKey: Breakpoint = 'lg';

const motionProps: MotionProps = {
  variants: varFade('inUp', { distance: 24 }),
};

type Props = BoxProps & {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export function HomeHero({ data, sx, ...other }: Props) {
  const scrollProgress = useScrollPercent();

  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up(mdKey));

  const distance = mdUp ? scrollProgress.percent : 0;

  const y1 = useTransformY(scrollProgress.scrollY, distance * -7);
  const y2 = useTransformY(scrollProgress.scrollY, distance * -6);
  const y3 = useTransformY(scrollProgress.scrollY, distance * -4);

  const opacity: MotionValue<number> = useTransform(
    scrollProgress.scrollY,
    [0, 1],
    [1, mdUp ? Number((1 - scrollProgress.percent / 100).toFixed(1)) : 1]
  );

  const renderHeading = () => (
    <m.div {...motionProps}>
      <Box
        component="h1"
        sx={[
          {
            my: 0,
            mx: 'auto',
            maxWidth: 780,
            display: 'flex',
            flexWrap: 'wrap',
            typography: 'h2',
            justifyContent: 'center',
            fontFamily: theme.typography.fontSecondaryFamily,
            [theme.breakpoints.up(lgKey)]: {
              fontSize: theme.typography.pxToRem(56),
              lineHeight: '75px',
            },
          },
        ]}
      >
        <Box
          component={m.span}
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          sx={{
            ...theme.mixins.textGradient(
              `300deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.warning.main} 25%, ${theme.vars.palette.primary.main} 50%, ${theme.vars.palette.warning.main} 75%, ${theme.vars.palette.primary.main} 100%`
            ),
            width: 1,
            backgroundSize: '400%',
            ml: { xs: 0.75, md: 1, xl: 1.5 },
          }}
        >
          Protiva
        </Box>
        Multi Education
        <Box component="span" sx={{ width: 1, opacity: 0.24 }}>
          Foundation
        </Box>
      </Box>
    </m.div>
  );

  const renderText = () => (
    <m.div {...motionProps}>
      <Typography
        variant="body2"
        sx={{
          mx: 'auto',
          [theme.breakpoints.up(smKey)]: { whiteSpace: 'pre' },
          [theme.breakpoints.up(lgKey)]: { fontSize: 16, lineHeight: '36px' },
        }}
      >
        {`Approved by the Government of the People's Republic of Bangladesh`}
      </Typography>
      <Typography
        variant="body2"
        color="warning"
        sx={{
          mx: 'auto',
          [theme.breakpoints.up(smKey)]: { whiteSpace: 'pre' },
        }}
      >
        (Govt. Reg. No-S-12757)
      </Typography>
    </m.div>
  );

  const renderButtons = () => (
    <Box
      sx={{
        mt: 3,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <m.div {...motionProps}>
        <Stack spacing={2.5} sx={{ alignItems: 'center' }}>
          <Button
            component={RouterLink}
            href={paths.apply.applyOnline}
            color="inherit"
            size="large"
            variant="contained"
            startIcon={<Iconify width={24} icon="iconoir:flash" />}
          >
            Apply online
          </Button>
        </Stack>
      </m.div>

      <m.div {...motionProps}>
        <Button
          color="inherit"
          size="large"
          variant="outlined"
          target="_blank"
          rel="noopener"
          href={paths.course.root}
          startIcon={<Iconify width={24} icon="eva:external-link-fill" />}
          sx={{ borderColor: 'text.primary' }}
        >
          Courses
        </Button>
      </m.div>
    </Box>
  );

  const renderSlides = () => (
    <Box sx={{ width: { sm: 580, md: 680, lg: 780 }, position: 'relative' }}>
      <m.div {...motionProps}>
        <Box
          sx={{
            '&:before': {
              position: 'absolute',
              content: '""',
              width: 1,
              height: 1,
              border: '1px',
              borderStyle: 'solid',
              borderColor: theme.palette.grey[400],
              left: -20,
              zIndex: -1,
              top: 20,
            },
          }}
        />
        <Carousel carousel={carousel}>
          {data.map((item, index) => (
            <CarouselItem key={item.id} index={index} item={item} />
          ))}
        </Carousel>
      </m.div>
    </Box>
  );

  return (
    <Box
      ref={scrollProgress.elementRef}
      component="section"
      sx={[
        {
          overflow: 'hidden',
          position: 'relative',
          [theme.breakpoints.up(mdKey)]: {
            minHeight: 760,
            height: '100vh',
            maxHeight: 1440,
            display: 'block',
            willChange: 'opacity',
            mt: 'calc(var(--layout-header-desktop-height) * -1)',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component={m.div}
        style={{ opacity }}
        sx={{
          width: 1,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          transition: theme.transitions.create(['opacity']),
          [theme.breakpoints.up(mdKey)]: { height: 1, position: 'fixed', maxHeight: 'inherit' },
        }}
      >
        <Container
          component={MotionContainer}
          sx={{
            py: 3,
            gap: 5,
            zIndex: 9,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            [theme.breakpoints.up(mdKey)]: {
              flex: '1 1 auto',
              justifyContent: 'center',
              py: 'var(--layout-header-desktop-height)',
            },
          }}
        >
          <Box
            sx={{
              gap: 6,
              display: 'grid',
              alignItems: 'center',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                lg: 'repeat(2, 1fr)',
              },
            }}
          >
            <div>
              <Stack spacing={3} sx={{ textAlign: 'center' }}>
                <m.div style={{ y: y1 }}>{renderHeading()}</m.div>
                <m.div style={{ y: y2 }}>{renderText()}</m.div>
              </Stack>

              <m.div style={{ y: y3 }}>{renderButtons()}</m.div>
            </div>

            <m.div style={{ y: y1 }}>{renderSlides()}</m.div>
          </Box>
        </Container>

        <HeroBackground />
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function useTransformY(value: MotionValue<number>, distance: number) {
  const physics: SpringOptions = {
    mass: 0.1,
    damping: 20,
    stiffness: 300,
    restDelta: 0.001,
  };

  return useSpring(useTransform(value, [0, 1], [0, distance]), physics);
}

function useScrollPercent() {
  const elementRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollY, 'change', (scrollHeight) => {
    let heroHeight = 0;

    if (elementRef.current) {
      heroHeight = elementRef.current.offsetHeight;
    }

    const scrollPercent = Math.floor((scrollHeight / heroHeight) * 100);

    if (scrollPercent >= 100) {
      setPercent(100);
    } else {
      setPercent(Math.floor(scrollPercent));
    }
  });

  return { elementRef, percent, scrollY };
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  index: number;
  item: Props['data'][number];
};

function CarouselItem({ item, index }: CarouselItemProps) {
  return (
    <Box
      component="img"
      alt={item.title}
      src={item.coverUrl}
      sx={{ objectFit: 'fill', aspectRatio: { xs: '4/3', sm: '16/10' } }}
    />
  );
}
