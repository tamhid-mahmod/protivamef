// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  rulesandRegulation: '/rules-and-regulation',
  missionAndVision: '/mission-and-vision',
  howToApply: '/how-to-apply',
  chairman: '/chairman',
  result: '/result',
  apply: {
    applyOnline: '/apply-online',
    downloadForm: '/pdf/apply-form.pdf',
    success: (id: string) => `/apply-online/${id}/success`,
  },
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  course: {
    root: `/course`,
    details: (id: string) => `/course/${id}`,
  },
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
      result: `${ROOTS.DASHBOARD}/student/publish-result`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/student/${id}/edit`,
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
      assign: (id: string) => `${ROOTS.DASHBOARD}/centre/${id}/assign-course`,
    },
    region: {
      root: `${ROOTS.DASHBOARD}/division`,
      division: `${ROOTS.DASHBOARD}/division`,
      district: `${ROOTS.DASHBOARD}/district`,
    },
  },
};
