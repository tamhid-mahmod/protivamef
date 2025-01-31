import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

import { Image } from 'src/components/image';
import { varFade, MotionViewport, AnimateCountUp } from 'src/components/animate';

// ----------------------------------------------------------------------

export function AboutWhat({ sx, ...other }: BoxProps) {
  const renderNumber = () => (
    <Stack sx={{ position: 'relative' }}>
      <Stack sx={{ gap: 5, flexDirection: { xs: 'column', md: 'row' } }}>
        {[
          { label: 'Learners', value: 1.5 },
          { label: 'Teachers', value: 10 },
          { label: 'Courses', value: 40 },
        ].map((item) => (
          <Stack key={item.label} spacing={2} sx={{ textAlign: 'center', width: 1 }}>
            <m.div variants={varFade('inUp', { distance: 24 })}>
              <AnimateCountUp
                to={item.value}
                unit={item.label === 'Students' ? 'k+' : '+'}
                toFixed={item.label === 'Teachers' ? 0 : 1}
                sx={[
                  (theme) => ({
                    fontWeight: 'fontWeightBold',
                    fontSize: { xs: 40, md: 64 },
                    lineHeight: { xs: 50 / 40, md: 80 / 64 },
                    fontFamily: theme.typography.fontSecondaryFamily,
                  }),
                ]}
              />
            </m.div>

            <m.div variants={varFade('inUp', { distance: 24 })}>
              <Box
                component="span"
                sx={[
                  (theme) => ({
                    ...theme.mixins.textGradient(
                      `90deg, ${theme.vars.palette.text.primary}, ${varAlpha(theme.vars.palette.text.primaryChannel, 0.2)}`
                    ),
                    opacity: 0.4,
                    typography: 'h6',
                  }),
                ]}
              >
                {item.label}
              </Box>
            </m.div>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );

  return (
    <Box
      component="section"
      sx={[{ overflow: 'hidden', py: { xs: 10, md: 5 } }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Container
        component={MotionViewport}
        sx={{
          gap: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography component={m.h1} variants={varFade('inRight')} variant="h1" sx={{ mb: 3 }}>
            About Us
          </Typography>

          <Typography
            component={m.p}
            variants={varFade('inRight')}
            sx={[
              (theme) => ({
                color: 'text.secondary',
                mx: 'auto',
                maxWidth: 560,
                ...theme.applyStyles('dark', {
                  color: 'common.white',
                }),
              }),
            ]}
          >
            প্রতিভা মাল্টি এডুকেশন ফাউন্ডেশন আর্ত্মানবতার সেবায় নিয়োজিত একটি কল্যাণমুখী, সেবামূলক ও
            স্বেচ্ছাসেবী প্রতিষ্ঠান।
          </Typography>
        </Box>

        <Grid container spacing={{ md: 3 }} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              component={m.h2}
              variants={varFade('inRight')}
              variant="h2"
              sx={{ mt: { xs: 3, md: 5 }, mb: 3 }}
            >
              Why Us?
            </Typography>
            <Typography
              component={m.p}
              variants={varFade('inRight')}
              sx={[
                (theme) => ({
                  color: 'text.secondary',
                  mx: 'auto',
                  ...theme.applyStyles('dark', {
                    color: 'common.white',
                  }),
                }),
              ]}
            >
              এ প্রতিষ্ঠানের প্রধান ও আকর্ষ্ণণীয় দিক হলো অত্যাধুনিক প্রযুক্তির প্রসার ঘটানো, এ ছাড়া
              বিষয়ভিত্তিক উচ্চ শিক্ষত ডিগ্রীধারী প্রশিক্ষণপ্রাপ্ত দক্ষ ও অভিজ্ঞ প্রশিক্ষক/শিক্ষক
              মণ্ডলী দ্বারা কর্মমুখী অত্যাধুনিক নতুন নতুন প্রযুক্তির প্রশিক্ষণের মাধ্যমে দক্ষ
              জনশক্তিতে পরিণত করা। আজ বিশ্ব জুড়ে দক্ষ জনশক্তির চাহিদা পূরণের লক্ষ্যে বিভিন্ন কোর্স্
              ভিত্তিক দক্ষতা ও প্রযুক্তির ব্যাপক প্রসার ঘটছে অর্থাৎ মানুষের জীবনযাত্রা,
              শিক্ষা,তথ্য-প্রযুক্তি,ব্যবসা- বাণিজ্য,চিকিৎসা,কৃষিকার্য্ এবং ভাষা শিক্ষাসহ সব কিছুতেই
              আজ দক্ষ কর্মী এবং প্রযুক্তি নির্ভ্র। তাই বিভিন্ন কোর্স্ ভিত্তিক বিপুল দক্ষ জনশক্তি
              সৃষ্টি অপরিহার্য্। বিভিন্ন স্তরের শিক্ষিত ও বেকার উচ্চতর শিক্ষায় ভর্তির সুযোগ থেকে
              বঞ্চিত তরুণ-তরুণীদের কোর্স্ ভিত্তিক বিভিন্ন প্রশিক্ষণ দিয়ে দক্ষ মানব সম্পদে রূপান্তর
              করা সম্ভব। আবার বিভিন্ন কর্ম্ ক্ষেত্রে নিয়োজিত কর্মীদেরকেও প্রশিক্ষণের মাধ্যমে দক্ষতা
              ও কর্ম্ পরিধি বাড়ানো সম্ভব। এছাড়া এসব প্রশিক্ষণের মাধ্যমে আত্ন-কর্ম্সংস্থানের সুযোগ
              সৃষ্টির সম্ভাবনাও রয়েছে প্রচুর। কোর্স্ ভিত্তিক প্রশিক্ষণ বিস্তারের মাধ্যমে বাংলাদেশের
              দারিদ্রবিমোচন ও প্রকট। এ সকল দিক বিবেচা এবং বেকারত্ব দূর করতে প্রতিভা মাল্টি এডুকেশন
              ফাউন্ডেশন দৃঢ়ভাবে প্রতিজ্ঞাবধ্য।এছাড়াও এসব কোর্স্ ভিত্তিক প্রশিক্ষণ একদিকে যেমন দেশের
              অর্থের সাশ্রয় ঘটাবে,অন্যদিকে বৈদেশিক মুদ্রা অর্জনেও সহায়ক ভূমিকা পালন করবে।
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <m.div variants={varFade('inUp')}>
              <Image
                alt="Our office small"
                src={`${CONFIG.assetsDir}/assets/images/about/about-summary.webp`}
                ratio="4/3"
                sx={(theme) => ({
                  borderRadius: 2,
                  boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.24)}`,
                  ...theme.applyStyles('dark', {
                    boxShadow: `-40px 40px 80px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
                  }),
                })}
              />
            </m.div>
          </Grid>
        </Grid>

        {renderNumber()}

        <Grid container spacing={{ md: 3 }} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography component={m.h5} variants={varFade('inLeft')} variant="h5" sx={{ mb: 3 }}>
              শিক্ষাক্রম পরিচিতি
            </Typography>

            <Typography
              component={m.p}
              variants={varFade('inLeft')}
              sx={[
                (theme) => ({
                  color: 'text.secondary',
                  mx: 'auto',
                  ...theme.applyStyles('dark', {
                    color: 'common.white',
                  }),
                }),
              ]}
            >
              দারিদ্র বিমোচনের মাধ্যমে দেশের অর্থনৈতিক উন্নয়নের জন্য দক্ষ জনশক্তি একান্ত প্রয়োজন।
              একবিংশ শতাব্দি তথ্য প্রযুক্তির যুগ। এই শতাব্দির চ্যালেঞ্জ মোকাবিলা করা সদাশয় সরকার
              বাহাদুরের পক্ষ্যে একা সম্ভর নয়। সরকারের সদিচ্ছাকে দ্রুত গতিতে এগিয়ে নেয়ার প্রতিশ্রুতি
              নিয়ে প্রতিষ্ঠিত হয়েছে প্রতিভা মাল্টি এডুকেশন ফাউন্ডেশন। দেশের লক্ষ লক্ষ
              শিক্ষিত/অর্ধশিক্ষিত বেকার যুবক এবং যুবতীদেরকে কারিগরি ও তথ্য-প্রযুক্তির উপর যুগোপযোগী
              পদ্ধতি প্রয়োগের মাধ্যমে ফ্রি/স্বপ্ল খরচে, শর্ট্/সার্টিফিকেট/ডিপ্লোমাসহ বিভিন্ন কোর্স্
              এর প্রশিক্ষণ দিয়ে দক্ষ কর্মী হিসেবে গড়ে তুলে দেশের চাহিদা মিটিয়ে বিশ্ব বাজারে সুদক্ষ
              জনশক্তি রফতানী করে আগামী প্রজন্মের শিশুদেরকে আন্তর্জাতিক তথ্য প্রযুক্তির ক্ষেত্রে
              এগিয়ে নেয়ার একটি নতুন কৌশল। এই কৌশল অবলম্বন করে শিক্ষা,স্বাস্থ,তথ্য-প্রযুক্তি ও
              কারিগরি জ্ঞানকে দেশের তৃণমূল পর্যায়ে পৌছে দিয়ে মানব সম্পদ এর উন্নয়ন সাধন ও দক্ষতা
              অর্জনের মাধ্যমে দেশে ও বিদেশে কর্ম্-সংস্থানের নবতর সুযোগ সৃষ্টির পরিকল্পনা নিয়ে এই মহৎ
              প্রকল্পটি হাতে নেয়া হয়েছে।
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              component={m.h5}
              variants={varFade('inRight')}
              variant="h5"
              sx={{ mt: { xs: 3, md: 0 }, mb: 3 }}
            >
              প্রশিক্ষণ বিভাগ
            </Typography>

            <Typography
              component={m.p}
              variants={varFade('inRight')}
              sx={[
                (theme) => ({
                  color: 'text.secondary',
                  mx: 'auto',
                  ...theme.applyStyles('dark', {
                    color: 'common.white',
                  }),
                }),
              ]}
            >
              প্রতিভা মাল্টি এডুকেশন ফাউন্ডেশন কারিগরি বৃত্তিমূলক শিক্ষার ক্ষেত্রে নতুন আদর্শে
              স্থাপিত একটি সম্পুর্ণ্ ব্যাতিক্রমধর্মী কর্মমুখী শিক্ষা প্রতিষ্ঠান। এ প্রতিষ্ঠানের
              মাধ্যমে দক্ষ জনশক্তি তৈরী করে সঠিক পথ নির্দেশনাসহ তরুণ-তরুণীদের আত্ননির্ভ্রশীল করে গড়ে
              তোলার জন্যই এ কর্মমুখী শিক্ষা প্রতিষ্ঠান সার্বিকভাবে কার্য্ক্রম প্রণীত হয়েছে। এ
              লক্ষ্যকে সামনে রেখে প্রতিভা মাল্টি এডুকেশন ফাউন্ডেশন এর অধীনে ওয়েব সাইটে
              (www.protivamef.com) বর্ণিত কোর্স্ সমূহ বিভিন্নভাবে প্রশিক্ষণের ব্যবস্থা গ্রহণ করা
              হয়েছে।
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
