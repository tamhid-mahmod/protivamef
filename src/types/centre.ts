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
  divisionId: string;
  districtId: string;
  publish: 'draft' | 'published';
  createdAt: IDateValue;
  updatedAt: IDateValue;
};
