import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type ICentreTableFilters = {
  name: string;
  publish: string;
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
  publish: string;
  createdAt: IDateValue;
  updatedAt: IDateValue;
};
