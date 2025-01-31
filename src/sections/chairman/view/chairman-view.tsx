'use client';

import { m } from 'framer-motion';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

import { Image } from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';
import { CustomBreadcrumbs, CustomBreadcrumbsBackground } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export function ChairmanView() {
  return (
    <>
      <CustomBreadcrumbsBackground>
        <CustomBreadcrumbs
          heading="Chairman"
          links={[{ name: 'Home', href: '/' }, { name: 'PMEF' }, { name: 'Chairman' }]}
        />
      </CustomBreadcrumbsBackground>

      <Container
        component={MotionViewport}
        sx={{ py: { xs: 10, md: 15 }, textAlign: { xs: 'start', md: 'unset' } }}
      >
        <Grid container columnSpacing={{ md: 3 }} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 4 }} sx={{ pr: { md: 7 } }}>
            <m.div variants={varFade('inUp')}>
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

              <Typography component="p" variant="caption" sx={{ mt: 1, textAlign: 'center' }}>
                মোঃ নাসির উদ্দিন ভূঞা
              </Typography>
            </m.div>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Typography component={m.h6} variants={varFade('inRight')} variant="h6" sx={{ mb: 2 }}>
              চেয়ারম্যান
            </Typography>

            <Typography
              component={m.p}
              variants={varFade('inRight')}
              sx={[
                (theme) => ({
                  typography: 'body2',
                  color: 'text.secondary',
                  ...theme.applyStyles('dark', {
                    color: 'common.white',
                  }),
                  lineHeight: 2,
                }),
              ]}
            >
              সম্মানিত সুধী ও সু-প্রিয়া শিক্ষার্থী বন্ধুরা। আসসালামু আলাইকুম, সকল প্রশংসা মহান
              আল্লাহ তালার।মহান আল্লাহতাআলার অশেষ কৃপায় শিক্ষক শিক্ষিকা, শিক্ষার্থী, অভিভাবক ও
              সুধীবৃন্দের সার্বিক সহযোগিতায় আজ আমরা সুপ্রতিষ্ঠিত। শিক্ষা মানুষের জন্য, শিক্ষা জীবনের
              জন্য। শিক্ষার মাধ্যমেই মানুষ অন্ধকার থেকে আলোর পথে আসে। শিক্ষাবিস্তার ও শিক্ষার্থীদের
              দক্ষতার সাথে সুনাগরিক হিসেবে গড়ে তুলতে আমরা বদ্ধপরিকর। ঐতিহ্যবাহী এ প্রতিষ্ঠানটি ১৯৯৬
              সালে প্রতিষ্ঠিত হওয়ার পর থেকে অসংখ্য শিক্ষার্থীদের মধ্যে আলোকবর্তিকা প্রজ্জলিত করে
              আসছে। বেকারত্বের অভিশাপ থেকে দেশের সমাজকে বাঁচাতে প্রতিভা বিগত ২০০৭ সাল হতে সুনামের
              সাথে পরিচালনা করে আসছে-ব্যাংক জব, প্রাইমারী শিক্ষক নিয়োগ, শিক্ষক নিবন্ধনসহ অন্যান্য
              Job Preparation Course, শিক্ষার আলোর প্রসার ঘটাতে ২০০৮ সালে প্রতিষ্ঠিত হয়েছে “প্রতিভা
              মডেল স্কুল”। শিক্ষিত/অর্ধশিক্ষিত ও বেকার ছেলে-মেয়েদের জন্য তথ্য প্রযুক্তির যুগে ICT
              শিক্ষার গুরুত্ব বিবেচনা করে ২০১২ সালে BTEB থেকে প্রতিভা কারিগরি প্রশিক্ষণ কেন্দ্র (কোড
              -৫২০৬৭) নামে অনুমোদন লাভ করে কম্পিউটারসহ বিভিন্ন ট্রেড কোর্স্ চালু করে প্রশিক্ষণ দিয়ে
              আসছে।আধুনিক ভাষা ইনস্টিটিউট (IML), ঢাকা বিশ্ববিদ্যালয় থেকে প্রশিক্ষণপ্রাপ্ত প্রশিক্ষক
              দ্বারা কোরিয়ান, জাপানিজ, চাইনিজ ভাষা শিক্ষাসহ বিভিন্ন ভাষা শিক্ষা কোর্স্ পরিচালনা করে
              আসছে। এরই ধারাবাহিকতায় ২০১৭ সালে BTEB থেকে প্রতিভা টেকনিক্যাল ইনস্টিটিউট (কোড -৫২১০৩)
              নামে অনুমোদনক্রমে স্কুল/কলেজ/মাদ্রাসাসহ বিভিন্ন সরকারী ও বেসরকারী প্রতিষ্ঠানে চাকুরী
              প্রত্যাশীদের জন্য চালু করা হয় ১ বছর মেয়াদী এডভান্স সার্টিফিকেট কোর্স্-কম্পিউটার
              টেকনোলজি( ICT) ও ফাইন আর্ট্(চারু-কারুকলা)শিক্ষা এবং ১ বছর মেয়াদী মেডিকেল সার্টিফিকেট
              কোর্স্- প্যারামেডিক্যাল, ডেন্টাল, নার্সিং এবং প্যাথলজিসহ বিভিন্ন প্রকার কোর্স্। ২০১৭
              সালের ৫ নভেম্বর জয়েনস্টক কোম্পানি এন্ড ফার্ম্ কর্তৃক“ প্রতিভা মাল্টি এডুকেশন ফাউন্ডেশন
              নামে অনুমোদন লাভ করে যা(রেজিঃ নং এস-১২৭৫৭/১৭) গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক
              অনুমোদিত। PME ফাউন্ডেশন কাউন্সিল এর অনুমোদনক্রমে এবং নিবন্ধীকরণ কর্তৃপক্ষকে অবহিত করে
              প্রতিষ্ঠানের উদ্দেশ্য সমূহ বাস্তবায়নের লক্ষ্যে সমগ্র বাংলাদেশের কর্ম এলাকায় আঞ্চলিক
              অফিস, ব্রাঞ্চ অফিস, প্রজেক্ট অফিস ও লিয়াজো অফিস খোলার পরিকল্পনার কাজ হাতে নেওয়া হয়েছে
              যার হেড অফিস ৩১৪/২, পশ্চিম ব্রাহ্মন্দী, নরসিংদী সদর, নরসিংদী,ঢাকা বাংলাদেশ দ্বারা
              নিয়ন্ত্রিত হবে। PME ফাউন্ডেশন একটি সেবামূলক এবং স্বেচ্ছাসেবী এক বা একাধিক বিষয়ের
              বিভিন্ন সমাজকল্যাণমূলক কর্মকান্ড ও মানব হিতৈষী দাতব্য প্রতিষ্ঠান। PME ফাউন্ডেশন
              কাউন্সিল এর অনুমোদনক্রমে এবং বাংলাদেশ সরকারের সহায়তায় শর্ট/সার্টিফিকেট/ডিপ্লোমা কোর্স্
              পরিচালনার মাধ্যমে শিক্ষিত/অর্ধশিক্ষিত বেকার যুবক যুবতীদের র্কসংস্থান সৃষ্টির লক্ষ্যে
              বিভিন্ন ট্রেড কোর্স্(কম্পিউটার বিভাগ, মেডিক্যাল বিভাগ, ভাষা শিক্ষা বিভাগ, ফ্যাশন
              বিভাগ,অন্যান্য শিক্ষাসহায়ক কোর্স্ এবং কারিগরি বিভাগ) চালু করে বিষয় ভিত্তিক দক্ষ
              প্রশিক্ষক দ্বারা কারিগরি প্রশিক্ষণ প্রদান করে পরীক্ষায় উত্তীর্ণদের সার্টিফিকেট
              প্রদানের মাধ্যমে বেকারত্ব দূরীকরনের ব্যবস্থা করা যা বাংলাদেশের শিক্ষিত/অর্ধশিক্ষিত
              বেকার যুবক যুবতীদের র্কসংস্থানসহ আর্থ্ সামাজিক উন্নয়নে বলিষ্ঠ ভূমিকা রাখবে বলে আমি
              দৃঢ়ভাবে বিশ্বাস করি। আল্লাহ আমাদের সহায় হোন।
            </Typography>
            <Box
              component={m.div}
              variants={varFade('inRight')}
              sx={[
                (theme) => ({
                  mt: 2,
                  typography: 'body2',
                  color: 'text.secondary',
                  ...theme.applyStyles('dark', {
                    color: 'common.white',
                  }),
                }),
              ]}
            >
              চেয়ারম্যান <br />
              প্রতিভা মাল্টি এডুকেশন ফাউন্ডেশন <br />
              ৩১৪/২,পশ্চিম ব্রাহ্মন্দী, নরসিংদী।
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
