import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IUserItem = {
  id: string;
  name: string;
  email: string;
  emailVerified: IDateValue;
  image?: string;

  createdAt: IDateValue;
  updatedAt: IDateValue;
};
