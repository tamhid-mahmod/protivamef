import type { IDateValue } from './common';
import type { IDistrictItem } from './district';

// ----------------------------------------------------------------------

export type IDivisionItem = {
  id: string;
  name: string;
  createdAt: IDateValue | Date;
  updatedAt: IDateValue | Date;
};

export type IDivisionWithDistrictsItem = IDivisionItem & {
  districts: IDistrictItem[];
};
