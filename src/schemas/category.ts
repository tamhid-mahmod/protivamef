import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export type NewCategorySchemaType = zod.infer<typeof NewCategorySchema>;

export const NewCategorySchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: zod
    .string()
    .min(8, { message: 'Description is required!' })
    .min(100, { message: 'Description must be at least 100 characters' })
    .max(500, { message: 'Description must be less than 500 characters' }),
  coverUrl: zod.custom<File | string | null>().transform((data, ctx) => {
    const hasFile = data instanceof File || (typeof data === 'string' && !!data.length);

    if (!hasFile) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: 'Cover is required!',
      });
      return null;
    }

    return data;
  }),
});

// ----------------------------------------------------------------------

export type DeleteCategorySchemaType = zod.infer<typeof DeleteCategorySchema>;

export const DeleteCategorySchema = zod.object({
  categoryId: zod.string().min(1, { message: 'Category id is required!' }),
});

// ----------------------------------------------------------------------

export type DeleteCategoriesSchemaType = zod.infer<typeof DeleteCategoriesSchema>;

export const DeleteCategoriesSchema = zod.object({
  categoryIds: zod
    .array(zod.string().min(1, { message: 'Categories id is required!' }))
    .nonempty({ message: 'At least one ID is required!' }),
});
