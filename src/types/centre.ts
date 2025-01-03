import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type ICentreTableFilters = {
  name: string;
  status: string;
};

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
  status: string;
  createdAt: IDateValue;
  updatedAt: IDateValue;
};
