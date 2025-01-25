import type { Metadata } from 'next';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Protiva Multi Education Foundation - Empowering Lifelong Learning',
  description:
    'Protiva Multi Education Foundation is dedicated to fostering education, skill development, and community empowerment. Join us in shaping a brighter future through innovative learning opportunities and impactful initiatives.',
};

const SLIDES = [
  {
    id: '1',
    title: '',
    coverUrl: '/assets/images/home/hero/slide-1.jpg',
    description: '',
  },
  {
    id: '2',
    title: '',
    coverUrl: '/assets/images/home/hero/slide-2.jpg',
    description: '',
  },
  {
    id: '3',
    title: '',
    coverUrl: '/assets/images/home/hero/slide-3.jpg',
    description: '',
  },
  {
    id: '4',
    title: '',
    coverUrl: '/assets/images/home/hero/slide-4.jpg',
    description: '',
  },
];

export default function Home() {
  return <HomeView data={SLIDES} />;
}
