import type { Metadata } from 'next';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Protiva Multi Education Foundation - Empowering Lifelong Learning',
  description:
    'Protiva Multi Education Foundation is dedicated to fostering education, skill development, and community empowerment. Join us in shaping a brighter future through innovative learning opportunities and impactful initiatives.',
};

const SLIDES = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  title: '',
  coverUrl: `/assets/images/home/hero/slider-${i + 1}.jpg`,
  description: '',
}));

export default function Home() {
  return <HomeView data={SLIDES} />;
}
