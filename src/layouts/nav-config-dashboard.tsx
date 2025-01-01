import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  region: icon('ic-region'),
  student: icon('ic-student'),
  centre: icon('ic-centre'),
  certificate: icon('ic-certificate'),
  user: icon('ic-user'),
  admit: icon('ic-admit'),
  course: icon('ic-course'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [{ title: 'App', path: paths.dashboard.root, icon: ICONS.dashboard }],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'User',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        children: [{ title: 'List', path: paths.dashboard.user.list }],
      },
      {
        title: 'Student',
        path: paths.dashboard.student.root,
        icon: ICONS.student,
        children: [
          { title: 'List', path: paths.dashboard.student.list },
          { title: 'Create', path: paths.dashboard.student.new },
        ],
      },
      {
        title: 'Course',
        path: paths.dashboard.student.root,
        icon: ICONS.course,
        children: [
          {
            title: 'Category',
            path: '#/dashboard/menu_level/menu_level_1a',
            children: [
              { title: 'List', path: '#/dashboard/menu_level/menu_level_1a/menu_level_2a' },
              { title: 'Create', path: '#/dashboard/menu_level/menu_level_1a/menu_level_2a' },
            ],
          },
          { title: 'List', path: paths.dashboard.centre.list },
          { title: 'Create', path: paths.dashboard.centre.new },
        ],
      },
      {
        title: 'Centre',
        path: paths.dashboard.centre.root,
        icon: ICONS.centre,
        children: [
          { title: 'List', path: paths.dashboard.centre.list },
          { title: 'Create', path: paths.dashboard.centre.new },
        ],
      },
      {
        title: 'Region',
        path: paths.dashboard.region.root,
        icon: ICONS.region,
        children: [
          { title: 'Division', path: paths.dashboard.region.division },
          { title: 'District', path: paths.dashboard.region.district },
        ],
      },
    ],
  },
  /**
   * Print
   */
  {
    subheader: 'Print',
    items: [
      { title: 'Certificate', path: paths.dashboard.certificate, icon: ICONS.certificate },
      { title: 'Admit card', path: paths.dashboard.admit, icon: ICONS.admit },
    ],
  },
];
