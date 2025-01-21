import type { IDateValue } from './common';
import type { ICategoryItem } from './category';

// ----------------------------------------------------------------------

export type ICourseTableFilters = {
  name: string;
  category: string[];
  publish: string;
};

export type ICourseItem = {
  id: string;
  categoryId: string;
  title: string;
  code: string;
  duration: string;
  qualification: string;
  fee: number;
  feeBase: number | null;
  publish: 'draft' | 'published';
  description: string;
  createdAt: IDateValue | Date;
  updatedAt: IDateValue | Date;
};

export type ICourseWithCategoryItem = Omit<ICourseItem, 'categoryId'> & {
  category: ICategoryItem;
};
