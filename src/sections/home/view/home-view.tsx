'use client';

import type { FabProps } from '@mui/material/Fab';
import type { UseBackToTopReturn } from 'minimal-shared/hooks';

import { varAlpha } from 'minimal-shared/utils';
import { useBackToTop } from 'minimal-shared/hooks';

import Fab from '@mui/material/Fab';
import SvgIcon from '@mui/material/SvgIcon';
import { Box, Link, Grid2, Stack, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Image } from 'src/components/image';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeHero } from '../home-hero';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

const QUICK_LINKS = [
  {
    path: 'http://www.bteb.gov.bd/',
    title: 'বাংলাদেশ কারিগরি শিক্ষা বোর্ড',
  },
  {
    path: 'http://www.dpe.gov.bd/',
    title: 'প্রাথমিক শিক্ষা অধিদপ্তর',
  },
  {
    path: 'http://www.mohfw.gov.bd/',
    title: 'Ministry of Health and Family Welfare',
  },
  {
    path: 'http://www.boesl.org.bd/',
    title: 'Bangladesh Overseas Employment and Services Limited',
  },
  {
    path: 'http://www.nu.edu.bd/',
    title: 'National University',
  },
  {
    path: 'http://www.educationboard.gov.bd/',
    title: 'Ministry of Education',
  },
  {
    path: 'http://www.youtube.com/',
    title: 'YouTube',
  },
];

const NOTICE = [
  {
    path: 'https://bteb.gov.bd/site/page/7cd7fa7f-4960-483c-b4e2-5404721ac62b/%E0%A6%A1%E0%A6%BF%E0%A6%AA%E0%A7%8D%E0%A6%B2%E0%A7%8B%E0%A6%AE%E0%A6%BE-%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A7%9F',
    title: 'ডিপ্লোমা পর্যায়',
  },
  {
    path: 'https://bteb.gov.bd/site/page/6270e5cb-d8f0-41a6-ad59-05539c431ad0/%E0%A6%8F%E0%A6%87%E0%A6%9A-%E0%A6%8F%E0%A6%B8-%E0%A6%B8%E0%A6%BF-%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A7%9F',
    title: 'এইচ এস সি পর্যায়',
  },
  {
    path: 'https://bteb.gov.bd/site/page/95facee1-de0b-4c09-b3ff-f35d9811d5d0/%E0%A6%8F%E0%A6%B8,%E0%A6%8F%E0%A6%B8,%E0%A6%B8%E0%A6%BF-%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A7%9F',
    title: 'এস,এস,সি পর্যায়',
  },
  {
    path: 'https://bteb.gov.bd/site/page/648435ff-5974-4b83-a9cc-24f45c103109/%E0%A6%B8%E0%A6%B2%E0%A7%8D%E0%A6%AA-%E0%A6%AE%E0%A7%87%E0%A7%9F%E0%A6%BE%E0%A6%A6%E0%A7%80-%E0%A6%93-%E0%A6%85%E0%A6%A8%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%A8%E0%A7%8D%E0%A6%AF',
    title: 'সল্প মেয়াদী ও অন্যান্য',
  },
];

export function HomeView({ data }: Props) {
  const pageProgress = useScrollProgress();

  const { onBackToTop, isVisible } = useBackToTop('90%');

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={[(theme) => ({ position: 'fixed', zIndex: theme.zIndex.appBar + 1 })]}
      />

      <BackToTopButton isVisible={isVisible} onClick={onBackToTop} />

      <HomeHero data={data} />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <Container sx={{ my: 10 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <Box>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Notice
                </Typography>

                <Stack spacing={2}>
                  {NOTICE.map((n) => (
                    <Link key={n.path} target="_blank" href={n.path}>
                      <Box
                        sx={(theme) => ({
                          p: 2,
                          borderRadius: 1,
                          border: `1px solid ${theme.palette.primary.main}`,
                          backgroundColor: theme.palette.Alert.successStandardBg,
                        })}
                      >
                        {n.title}
                      </Box>
                    </Link>
                  ))}
                </Stack>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                  Chairman
                </Typography>

                <Image
                  alt="Our office small"
                  src={`${CONFIG.assetsDir}/assets/images/chairman/chairman.webp`}
                  ratio="1/1"
                  sx={(theme) => ({
                    borderRadius: 3,
                    boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
                    ...theme.applyStyles('dark', {
                      boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
                    }),
                  })}
                />

                <Link
                  component="a"
                  href={paths.chairman}
                  variant="caption"
                  sx={{ mt: 1, color: 'black' }}
                >
                  মোঃ নাসির উদ্দিন ভূঞা
                </Link>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                  Quick Links
                </Typography>

                <Stack spacing={1}>
                  {QUICK_LINKS.map((q_link) => (
                    <Link key={q_link.path} target="_blank" href={q_link.path}>
                      {q_link.title}
                    </Link>
                  ))}
                </Stack>
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      </Stack>
    </>
  );
}

// ----------------------------------------------------------------------

type BackToTopProps = FabProps & {
  isVisible: UseBackToTopReturn['isVisible'];
};

function BackToTopButton({ isVisible, sx, ...other }: BackToTopProps) {
  return (
    <Fab
      aria-label="Back to top"
      sx={[
        (theme) => ({
          width: 48,
          height: 48,
          position: 'fixed',
          transform: 'scale(0)',
          right: { xs: 24, md: 32 },
          bottom: { xs: 24, md: 32 },
          zIndex: theme.zIndex.speedDial,
          transition: theme.transitions.create(['transform']),
          ...(isVisible && { transform: 'scale(1)' }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <SvgIcon>
        {/* https://icon-sets.iconify.design/solar/double-alt-arrow-up-bold-duotone/ */}
        <path
          fill="currentColor"
          d="M5 17.75a.75.75 0 0 1-.488-1.32l7-6a.75.75 0 0 1 .976 0l7 6A.75.75 0 0 1 19 17.75z"
          opacity="0.5"
        />
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M4.43 13.488a.75.75 0 0 0 1.058.081L12 7.988l6.512 5.581a.75.75 0 1 0 .976-1.138l-7-6a.75.75 0 0 0-.976 0l-7 6a.75.75 0 0 0-.081 1.057"
          clipRule="evenodd"
        />
      </SvgIcon>
    </Fab>
  );
}
