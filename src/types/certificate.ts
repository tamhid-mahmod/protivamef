import type { IDateValue } from './common';
import type { IStudentAllItem } from './student';

// ----------------------------------------------------------------------

export type ICertificateItem = {
  id: string;
  studentAId: string;
  mark: number;
  student?: IStudentAllItem | null;
  createdAt: IDateValue | Date;
  updatedAt: IDateValue | Date;
};
