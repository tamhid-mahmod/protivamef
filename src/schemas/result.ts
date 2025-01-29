import dayjs from 'dayjs';
import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export type NewResultSchemaType = zod.infer<typeof NewResultSchema>;

export const NewResultSchema = zod.object({
  studentAId: zod.string().min(1, { message: 'Student ID is required!' }),
  mark: zod
    .number({ coerce: true })
    .min(1, { message: 'Mark is required!' })
    .nullable()
    .transform((val, ctx) => {
      if (val === null || val === undefined) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'Mark is required!',
        });
        return val;
      }
      return val;
    }),
  createdAt: zod.coerce
    .date()
    .nullable()
    .transform((dateString, ctx) => {
      const date = dayjs(dateString).format();

      const stringToDate = zod.string().pipe(zod.coerce.date());

      if (!dateString) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'Date of issue is required!',
        });
        return null;
      }

      if (!stringToDate.safeParse(date).success) {
        ctx.addIssue({
          code: zod.ZodIssueCode.invalid_date,
          message: 'Invalid Date!!',
        });
      }

      return date;
    })
    .pipe(zod.union([zod.number(), zod.string(), zod.date(), zod.null()])),
});

// ----------------------------------------------------------------------

export type UpdateResultSchemaType = zod.infer<typeof UpdateResultSchema>;

export const UpdateResultSchema = zod.object({
  resultId: zod.string().min(1, { message: 'Result id is required!' }),
  ...NewResultSchema.shape,
});

// ----------------------------------------------------------------------

export type DeleteResultSchemaType = zod.infer<typeof DeleteResultSchema>;

export const DeleteResultSchema = zod.object({
  resultId: zod.string().min(1, { message: 'Result id is required!' }),
});

// ----------------------------------------------------------------------

export type DeleteResultsSchemaType = zod.infer<typeof DeleteResultsSchema>;

export const DeleteResultsSchema = zod.object({
  resultIds: zod
    .array(zod.string().min(1, { message: 'Results id is required!' }))
    .nonempty({ message: 'At least one ID is required!' }),
});
