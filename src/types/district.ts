import type { IDateValue } from './common';
import type { IDivisionItem } from './division';

// ----------------------------------------------------------------------

export type IDistrictTableFilters = {
  name: string;
  divisionName: string[];
};

export type IDistrictItem = {
  id: string;
  divisionId: string;
  name: string;
  createdAt: IDateValue;
  updatedAt: IDateValue;
};

export type IDistrictsWithDivisionItem = IDistrictItem & {
  division: IDivisionItem;
};
