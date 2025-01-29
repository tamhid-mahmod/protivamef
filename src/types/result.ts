import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IResultTableFilters = {
  studentId: string;
};

export type IResultItem = {
  id: string;
  studentId: string;
  mark: number;
  createdAt: IDateValue | Date;
  updatedAt: IDateValue | Date;
};
