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
    resetPassword: `${ROOTS.AUTH}/reset-password`,
  },
};
