import type { IDateValue } from './common';
import type { IDistrictItem } from './district';

// ----------------------------------------------------------------------

export type IDivisionItem = {
  id: string;
  name: string;
  createdAt: IDateValue;
  updatedAt: IDateValue;
};

export type IDivisionWithDistrictsItem = IDivisionItem & {
  districts: IDistrictItem[];
};
