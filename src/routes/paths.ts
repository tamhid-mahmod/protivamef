import { kebabCase } from 'es-toolkit';

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
  },
};
