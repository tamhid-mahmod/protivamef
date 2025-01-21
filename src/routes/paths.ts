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
      new: `${ROOTS.DASHBOARD}/user/new`,
    },
    student: {
      root: `${ROOTS.DASHBOARD}/student`,
      list: `${ROOTS.DASHBOARD}/student/list`,
      new: `${ROOTS.DASHBOARD}/student/new`,
    },
    course: {
      root: `${ROOTS.DASHBOARD}/course`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/course/${id}/edit`,
      new: `${ROOTS.DASHBOARD}/course/new`,
      category: {
        root: `${ROOTS.DASHBOARD}/course/category`,
        edit: (id: string) => `${ROOTS.DASHBOARD}/course/category/${id}/edit`,
        new: `${ROOTS.DASHBOARD}/course/category/new`,
      },
    },
    centre: {
      root: `${ROOTS.DASHBOARD}/centre`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/centre/${id}/edit`,
      new: `${ROOTS.DASHBOARD}/centre/new`,
    },
    region: {
      root: `${ROOTS.DASHBOARD}/division`,
      division: `${ROOTS.DASHBOARD}/division`,
      district: `${ROOTS.DASHBOARD}/district`,
    },
  },
};
