import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

import type { NavMainProps } from './main/nav/types';

// ----------------------------------------------------------------------

export const navData: NavMainProps['data'] = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
  {
    title: 'Course',
    path: '/course',
    icon: <Iconify width={22} icon="solar:book-bold-duotone" />,
    children: [
      {
        items: [
          { title: 'Computer Courses', path: '1' },
          { title: 'Fashion Courses', path: '2' },
          { title: 'Technical Courses', path: '3' },
          { title: 'Advanced Certificate Courses', path: '4' },
          { title: 'Language Courses', path: '5' },
          { title: 'Job Courses', path: '6' },
          { title: 'Medical Courses', path: '7' },
          { title: 'Agricultural Courses', path: '8' },
        ],
      },
    ],
  },
  {
    title: 'Apply',
    path: '/apply',
    icon: <Iconify width={22} icon="solar:check-circle-bold-duotone" />,
    children: [
      {
        items: [
          { title: 'Apply Online', path: paths.apply.applyOnline },
          { title: 'Download Form', path: paths.apply.downloadForm },
        ],
      },
    ],
  },
  {
    title: 'Result',
    path: paths.result,
    icon: <Iconify width={22} icon="solar:checklist-minimalistic-bold-duotone" />,
  },
  {
    title: 'PMEF',
    path: '/pmef',
    icon: <Iconify width={22} icon="solar:closet-2-bold-duotone" />,
    children: [
      {
        items: [
          { title: 'Chairman', path: paths.chairman },
          { title: 'How to apply', path: paths.howToApply },
          { title: 'Mission & Vision', path: paths.missionAndVision },
        ],
      },
    ],
  },
  {
    title: 'About us',
    path: paths.about,
    icon: <Iconify width={22} icon="solar:global-bold-duotone" />,
  },
  {
    title: 'Contact us',
    path: paths.contact,
    icon: <Iconify width={22} icon="solar:map-point-bold-duotone" />,
  },
];
