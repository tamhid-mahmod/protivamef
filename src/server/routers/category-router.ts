import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { isDataConflict } from 'src/services/category';
import { NewCategorySchema } from 'src/schemas/category';

import { router } from '../__internals/router';
import { privateProcedure } from '../procedures';
// ----------------------------------------------------------------------

export const categoryRouter = router({
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
});
