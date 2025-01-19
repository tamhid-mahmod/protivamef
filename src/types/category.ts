import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type ICategoryTableFilters = {
  name: string;
};

export type ICategoryItem = {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  createdAt: IDateValue | Date;
  updatedAt: IDateValue | Date;
};
