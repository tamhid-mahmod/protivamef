import type { IDateValue } from './common';
import type { ICourseItem } from './course';
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
  createdAt: IDateValue | Date;
  updatedAt: IDateValue | Date;
};

export type ICentresWithDivisionAndDistrict = ICentreItem & {
  division: IDivisionItem;
  district: IDistrictItem;
};

export type ICentreCourseItem = {
  id: string;
  centreId: string;
  courseId: string;
  course: ICourseItem;
  createdAt: IDateValue | Date;
};
