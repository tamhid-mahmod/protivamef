import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IDistrictTableFilters = {
  name: string;
  divisionName: string[];
};

export type IDistrictItem = {
  id: string;
  divisionName: string;
  name: string;
  createdAt: IDateValue;
  updatedAt: IDateValue;
};
