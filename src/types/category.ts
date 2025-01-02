import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type ICategoryItem = {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  createdAt: IDateValue;
  updatedAt: IDateValue;
};
