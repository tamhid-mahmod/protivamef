import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { isDataConflict } from 'src/services/course';
import { NewCourseSchema } from 'src/schemas/course';

import { router } from '../__internals/router';
import { privateProcedure } from '../procedures';
// ----------------------------------------------------------------------

export const courseRouter = router({
  createCourse: privateProcedure.input(NewCourseSchema).mutation(async ({ c, input }) => {
    const { categoryId, title, code, duration, qualification, fee, feeBase, description, publish } =
      input;

    try {
      const existingCourse = await isDataConflict(code);

      if (existingCourse) {
        throw new HTTPException(409, { message: 'Course with similar data already exists.' });
      }

      const newCourse = await db.course.create({
        data: {
          categoryId,
          title,
          code,
          duration,
          qualification,
          fee: fee as number,
          feeBase,
          description,
          publish,
        },
      });

      return c.json({ success: true, course: newCourse }, 201);
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }),
});
