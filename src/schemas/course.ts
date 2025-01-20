import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export type NewCourseSchemaType = zod.infer<typeof NewCourseSchema>;

export const NewCourseSchema = zod.object({
  categoryId: zod.string().min(1, { message: 'Category is required!' }),
  title: zod.string().min(1, { message: 'Course title is required!' }),
  code: zod.string().min(2, { message: 'Code is required!' }),
  duration: zod.string().min(1, { message: 'Duration is required' }),
  qualification: zod.string().min(1, { message: 'Qualification is required!' }),
  fee: zod
    .number({ coerce: true })
    .min(1, { message: 'Price is required!' })
    .nullable()
    .transform((val, ctx) => {
      if (val === null || val === undefined) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'Fee is required!',
        });
        return val;
      }
      return val;
    }),
  publish: zod.enum(['draft', 'published']),
  description: zod
    .string()
    .min(8, { message: 'Description is required!' })
    .min(100, { message: 'Description must be at least 100 characters' }),
  // Not required
  feeBase: zod.number({ coerce: true }).nullable(),
});

// ----------------------------------------------------------------------

export type UpdateCourseSchemaType = zod.infer<typeof UpdateCourseSchema>;

export const UpdateCourseSchema = zod.object({
  courseId: zod.string().min(1, { message: 'Course id is required!' }),
  ...NewCourseSchema.shape,
});

// ----------------------------------------------------------------------

export type GetCourseSchemaType = zod.infer<typeof GetCourseSchema>;

export const GetCourseSchema = zod.object({
  courseId: zod.string().min(1, { message: 'Course id is required!' }),
});

// ----------------------------------------------------------------------

export type DeleteCourseSchemaType = zod.infer<typeof DeleteCourseSchema>;

export const DeleteCourseSchema = zod.object({
  courseId: zod.string().min(1, { message: 'Course id is required!' }),
});

// ----------------------------------------------------------------------

export type DeleteCoursesSchemaType = zod.infer<typeof DeleteCoursesSchema>;

export const DeleteCoursesSchema = zod.object({
  courseIds: zod
    .array(zod.string().min(1, { message: 'Courses id is required!' }))
    .nonempty({ message: 'At least one ID is required!' }),
});
