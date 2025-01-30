import type { IDateValue } from './common';
import type { IStudentAllItem } from './student';

// ----------------------------------------------------------------------

export type IResultTableFilters = {
  studentAId: string;
};

export type IResultItem = {
  id: string;
  studentAId: string;
  mark: number;
  student?: IStudentAllItem | null;
  createdAt: IDateValue | Date;
  updatedAt: IDateValue | Date;
};
