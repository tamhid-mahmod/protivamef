import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IResultTableFilters = {
  studentAId: string;
};

export type IResultItem = {
  id: string;
  studentAId: string;
  mark: number;
  createdAt: IDateValue | Date;
  updatedAt: IDateValue | Date;
};
