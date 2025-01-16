import type { IDateValue } from './common';
import type { IDistrictItem } from './district';
import type { IDivisionItem } from './division';

// ----------------------------------------------------------------------

export type ICentreTableFilters = {
  name: string;
  divisions: string[];
  districts: string[];
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

export type ICentresWithDivisionAndDistrict = ICentreItem & {
  division: IDivisionItem;
  district: IDistrictItem;
};
