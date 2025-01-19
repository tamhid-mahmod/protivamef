import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { isDataConflict, getCategoryById } from 'src/services/category';
import {
  NewCategorySchema,
  GetCategorySchema,
  DeleteCategorySchema,
  UpdateCategorySchema,
  DeleteCategoriesSchema,
} from 'src/schemas/category';

import { router } from '../__internals/router';
import { publicProcedure, privateProcedure } from '../procedures';
// ----------------------------------------------------------------------

export const categoryRouter = router({
  getCategories: publicProcedure.query(async ({ c }) => {
    const categories = await db.category.findMany();

    return c.superjson({ categories });
  }),

  getCategoryDetails: publicProcedure.input(GetCategorySchema).query(async ({ c, input }) => {
    const { categoryId } = input;

    const category = await getCategoryById(categoryId);

    if (!category) {
      throw new HTTPException(404, { message: 'The resource does not exist.' });
    }

    return c.json({ category });
  }),

  createCategory: privateProcedure.input(NewCategorySchema).mutation(async ({ c, input }) => {
    const { name, description, coverUrl } = input;

    try {
      const existingCategory = await isDataConflict(name);

      if (existingCategory) {
        throw new HTTPException(409, { message: 'Category with similar data already exists.' });
      }

      const newCategory = await db.category.create({
        data: {
          name,
          description,
          coverUrl: coverUrl as string,
        },
      });

      return c.json({ success: true, data: newCategory }, 201);
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }),

  updateCategory: privateProcedure.input(UpdateCategorySchema).mutation(async ({ c, input }) => {
    const { categoryId, name, description, coverUrl } = input;

    try {
      const existingCategory = await getCategoryById(categoryId);

      if (!existingCategory) {
        throw new HTTPException(404, { message: 'The resource to be update does not exist.' });
      }

      const existingConflictCategory = await isDataConflict(name, existingCategory.id);

      if (existingConflictCategory) {
        throw new HTTPException(409, { message: 'Category with similar data already exists.' });
      }

      await db.category.update({
        where: {
          id: categoryId,
        },
        data: {
          ...(name && { name }),
          ...(description && { description }),
          ...(coverUrl && { coverUrl: coverUrl as string }),
        },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error updating centre:', error);
      throw error;
    }
  }),

  deleteCategory: privateProcedure.input(DeleteCategorySchema).mutation(async ({ c, input }) => {
    const { categoryId } = input;

    try {
      const existingCategory = await getCategoryById(categoryId);

      if (!existingCategory) {
        throw new HTTPException(404, { message: 'The resource to be deleted does not exist.' });
      }

      await db.category.delete({
        where: {
          id: existingCategory.id,
        },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error deleting centre:', error);
      throw error;
    }
  }),

  deleteCategories: privateProcedure
    .input(DeleteCategoriesSchema)
    .mutation(async ({ c, input }) => {
      const { categoryIds } = input;

      try {
        const existingCategories = await db.category.findMany({
          where: {
            id: { in: categoryIds },
          },
        });

        if (!existingCategories) {
          throw new HTTPException(404, { message: 'The resource to be deleted does not exist.' });
        }

        await db.category.deleteMany({
          where: { id: { in: categoryIds } },
        });

        return c.json({ success: true });
      } catch (error) {
        console.error('Error deleting categories:', error);
        throw error;
      }
    }),
});
