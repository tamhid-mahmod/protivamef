import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IUserTableFilters = {
  name: string;
};

export type IUserItem = {
  id: string;
  name: string;
  email: string;
  emailVerified: IDateValue;
  image?: string;
  role: string;

  createdAt: IDateValue;
  updatedAt: IDateValue;
};
