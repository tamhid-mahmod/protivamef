import { z as zod } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { getCourseById, isDataConflict } from 'src/services/course';
import {
  NewCourseSchema,
  UpdateCourseSchema,
  DeleteCourseSchema,
  DeleteCoursesSchema,
} from 'src/schemas/course';

import { router } from '../__internals/router';
import { publicProcedure, privateProcedure } from '../procedures';
// ----------------------------------------------------------------------

export const courseRouter = router({
  getCourses: publicProcedure.query(async ({ c }) => {
    const courses = await db.course.findMany();

    return c.superjson({ courses });
  }),

  getCoursesBySlug: publicProcedure
    .input(zod.object({ slug: zod.string().min(1) }))
    .query(async ({ c, input }) => {
      const { slug } = input;

      const category = await db.category.findUnique({
        where: {
          slug,
        },
      });

      const courses = await db.course.findMany({
        where: {
          categoryId: category?.id,
        },
      });

      return c.json({ courses, category });
    }),

  getCourseDetails: publicProcedure
    .input(zod.object({ courseId: zod.string().min(1) }))
    .query(async ({ c, input }) => {
      const { courseId } = input;

      const course = await getCourseById(courseId);

      if (!course) {
        throw new HTTPException(404, { message: 'The resource does not exist.' });
      }

      return c.json({ course });
    }),

  getCoursesWithCategory: publicProcedure.query(async ({ c }) => {
    const coursesWithCategory = await db.course.findMany({
      include: {
        category: true,
      },
    });

    return c.superjson({ coursesWithCategory });
  }),

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

  updateCourse: privateProcedure.input(UpdateCourseSchema).mutation(async ({ c, input }) => {
    const {
      courseId,
      categoryId,
      title,
      code,
      duration,
      qualification,
      fee,
      feeBase,
      publish,
      description,
    } = input;

    try {
      const existingCourse = await getCourseById(courseId);

      if (!existingCourse) {
        throw new HTTPException(404, { message: 'The resource to be deleted does not exist.' });
      }

      const existingConflictCourse = await isDataConflict(code, existingCourse.id);

      if (existingConflictCourse) {
        throw new HTTPException(409, { message: 'Course with similar data already exists.' });
      }

      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          ...(categoryId && { categoryId }),
          ...(title && { title }),
          ...(code && { code }),
          ...(duration && { duration }),
          ...(qualification && { qualification }),
          ...(fee && { fee }),
          ...(feeBase && { feeBase }),
          ...(publish && { publish }),
          ...(description && { description }),
        },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  }),

  deleteCourse: privateProcedure.input(DeleteCourseSchema).mutation(async ({ c, input }) => {
    const { courseId } = input;

    try {
      const existingCourse = await getCourseById(courseId);

      if (!existingCourse) {
        throw new HTTPException(404, { message: 'The resource to be deleted does not exist.' });
      }

      await db.course.delete({
        where: {
          id: existingCourse.id,
        },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  }),

  deleteCourses: privateProcedure.input(DeleteCoursesSchema).mutation(async ({ c, input }) => {
    const { courseIds } = input;

    try {
      const existingCourses = await db.course.findMany({
        where: {
          id: { in: courseIds },
        },
      });

      if (!existingCourses) {
        throw new HTTPException(404, { message: 'The resource to be deleted does not exist.' });
      }

      await db.course.deleteMany({
        where: { id: { in: courseIds } },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error deleting courses:', error);
      throw error;
    }
  }),
});
