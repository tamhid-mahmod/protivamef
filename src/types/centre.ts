import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type ICentreItem = {
  id: string;
  name: string;
  code: string;
  email: string;
  phoneNumber: string;
  address: string;
  division: string;
  district: string;
  isPublished: boolean;
  createdAt: IDateValue;
  updatedAt: IDateValue;
};
