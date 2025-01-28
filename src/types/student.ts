import type { ICentreItem } from './centre';
import type { ICourseItem } from './course';
import type { IDistrictItem } from './district';
import type { IDivisionItem } from './division';
import type { IDateValue, IDatePickerControl } from './common';

// ----------------------------------------------------------------------

export type IStudentTableFilters = {
  name: string;
  centre: string[];
  endDate: IDatePickerControl;
  startDate: IDatePickerControl;
  status: string;
};

export type IStudentEducationBackgroundItem = {
  id: string;
  examination: string;
  board: string;
  passYear: string;
  roll: string;
  result: string;
  createdAt: IDateValue | Date;
  updatedAt: IDateValue | Date;
};

export type IStudentAppliedForItem = {
  id: string;
  divisionId: string;
  districtId: string;
  centreId: string;
  courseId: string;
  createdAt: IDateValue | Date;
  updatedAt: IDateValue | Date;
};

export type IStudentItem = {
  id: string;
  rollNumber: string;
  imageUrl: string | null;
  fullName: string;
  dateOfBirth: IDateValue | Date;
  gender: string;
  email: string | null;
  phoneNumber: string | null;
  address: string;
  religion: string;
  fatherName: string;
  motherName: string;
  status: 'pending' | 'registered' | 'rejected';
  iAgree: boolean;
  studentEducationBackgroundId: string;
  studentAppliedForId: string;
  session: string | null;
  createdAt: IDateValue | Date;
  updatedAt: IDateValue | Date;
};

export type IStudentAllItem = IStudentItem & {
  educationBackground: IStudentEducationBackgroundItem;
  appliedFor: IStudentAppliedForItem;
  division: IDivisionItem | null;
  district: IDistrictItem | null;
  centre: ICentreItem | null;
  course: ICourseItem | null;
};
