import type { IDateValue } from './common';
import type { ICentreItem } from './centre';
import type { ICourseItem } from './course';
import type { IDistrictItem } from './district';
import type { IDivisionItem } from './division';

// ----------------------------------------------------------------------

export type IStudentEducationBackgroundItem = {
  id: string;
  examination: string;
  board: string;
  passYear: string;
  roll: string;
  result: string;
  createdAt: IDateValue;
  updatedAt: IDateValue;
};

export type IStudentAppliedForItem = {
  id: string;
  divisionId: string;
  districtId: string;
  centreId: string;
  courseId: string;
  createdAt: IDateValue;
  updatedAt: IDateValue;
};

export type IStudentItem = {
  id: string;
  rollNumber: string;
  imageUrl?: string;
  fullName: string;
  dateOfBirth: IDateValue | Date;
  gender: string;
  email?: string;
  phoneNumber: string;
  address: string;
  religion: string;
  fatherName: string;
  motherName: string;
  status: 'pending' | 'registered' | 'canceled';
  iAgree: string;
  studentEducationBackgroundId: string;
  studentAppliedFor: string;
  educationBackground: IStudentEducationBackgroundItem;
  appliedFor: IStudentAppliedForItem;
  division: IDivisionItem;
  district: IDistrictItem;
  centre: ICentreItem;
  course: ICourseItem;
  createdAt: IDateValue;
  updatedAt: IDateValue;
};
