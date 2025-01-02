// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  contact: '/contact-us',
  faqs: '/faqs',
  // AUTH
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
    resetPassword: `${ROOTS.AUTH}/reset-password`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    certificate: `${ROOTS.DASHBOARD}/certificate`,
    admit: `${ROOTS.DASHBOARD}/admit`,
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      list: `${ROOTS.DASHBOARD}/user/list`,
    },
    student: {
      root: `${ROOTS.DASHBOARD}/student`,
      list: `${ROOTS.DASHBOARD}/student/list`,
      new: `${ROOTS.DASHBOARD}/student/new`,
    },
    course: {
      root: `${ROOTS.DASHBOARD}/course`,
      list: `${ROOTS.DASHBOARD}/course/list`,
      new: `${ROOTS.DASHBOARD}/course/new`,
      category: {
        root: `${ROOTS.DASHBOARD}/course/category`,
        list: `${ROOTS.DASHBOARD}/course/category/list`,
        new: `${ROOTS.DASHBOARD}/course/category/new`,
      },
    },
    centre: {
      root: `${ROOTS.DASHBOARD}/centre`,
      list: `${ROOTS.DASHBOARD}/centre/list`,
      new: `${ROOTS.DASHBOARD}/centre/new`,
    },
    region: {
      root: `${ROOTS.DASHBOARD}/region`,
      division: `${ROOTS.DASHBOARD}/devision/list`,
      district: `${ROOTS.DASHBOARD}/district/list`,
    },
  },
};
