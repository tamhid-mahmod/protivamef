import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

import type { NavMainProps } from './main/nav/types';

// ----------------------------------------------------------------------

export const navData: NavMainProps['data'] = [
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
