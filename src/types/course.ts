import type { IDateValue } from './common';

// ----------------------------------------------------------------------

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
