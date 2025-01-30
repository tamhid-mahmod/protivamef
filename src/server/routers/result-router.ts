import { Decimal } from 'decimal.js';
import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { getStudentByStudentAId } from 'src/services/student';
import { getResultById, getresultByStudentAId } from 'src/services/result';
import {
  NewResultSchema,
  GetResultSchema,
  DeleteResultSchema,
  UpdateResultSchema,
  DeleteResultsSchema,
} from 'src/schemas/result';

import { router } from '../__internals/router';
import { publicProcedure, privateProcedure } from '../procedures';

// ----------------------------------------------------------------------

export const resultRouter = router({
  getResults: privateProcedure.query(async ({ c, input }) => {
    const results = await db.result.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return c.superjson({ results });
  }),

  getResult: publicProcedure.input(GetResultSchema).mutation(async ({ c, input }) => {
    const { studentAId } = input;

    const exisitingResult = await getresultByStudentAId(studentAId);

    if (!exisitingResult) {
      throw new HTTPException(404, { message: 'Result not found!' });
    }

    const existingStudent = await db.student.findUnique({
      where: {
        studentAId,
      },
      include: {
        appliedFor: true,
      },
    });

    if (!existingStudent) {
      throw new HTTPException(404, { message: 'Result not found!' });
    }

    const centre = await db.centre.findUnique({
      where: {
        id: existingStudent?.appliedFor.centreId,
        publish: 'published',
      },
    });

    const course = await db.course.findUnique({
      where: {
        id: existingStudent?.appliedFor.courseId,
        publish: 'published',
      },
    });

    if (!course) {
      return c.json({});
    }

    const produceResult = {
      ...exisitingResult,
      student: {
        ...existingStudent,
        centre,
        course,
      },
    };

    return c.json({ result: produceResult });
  }),

  publushResult: privateProcedure.input(NewResultSchema).mutation(async ({ c, input }) => {
    const { studentAId, mark, createdAt } = input;

    try {
      const existingStudent = await getStudentByStudentAId(studentAId);

      if (!existingStudent) {
        throw new HTTPException(400, { message: 'Student not exist!' });
      }

      if (existingStudent.status !== 'registered') {
        throw new HTTPException(400, { message: 'Student not registered yet!' });
      }

      if (!existingStudent.session) {
        throw new HTTPException(400, { message: "Student don't have session!" });
      }

      const existingResult = await getresultByStudentAId(studentAId);

      if (existingResult) {
        throw new HTTPException(400, { message: 'Result already published!' });
      }

      const result = await db.result.create({
        data: {
          studentAId,
          mark: new Decimal(mark as number),
          createdAt: createdAt as Date,
        },
      });

      await db.student.update({
        where: {
          studentAId,
        },
        data: {
          resultId: result.id,
        },
      });

      return c.json({ success: true, result }, 201);
    } catch (error) {
      console.error('Error updating publish result:', error);
      throw error;
    }
  }),

  updateResult: privateProcedure.input(UpdateResultSchema).mutation(async ({ c, input }) => {
    const { resultId, mark, createdAt } = input;

    try {
      const exisitingResult = await getResultById(resultId);

      if (!exisitingResult) {
        throw new HTTPException(400, { message: 'The resource to be update does not exist.' });
      }

      await db.result.update({
        where: {
          id: resultId,
        },
        data: {
          ...(mark && { mark }),
          ...(createdAt && { createdAt: createdAt as Date }),
        },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error updating result:', error);
      throw error;
    }
  }),

  deleteResult: privateProcedure.input(DeleteResultSchema).mutation(async ({ c, input }) => {
    const { resultId } = input;

    try {
      const exisitingResult = await getResultById(resultId);

      if (!exisitingResult) {
        throw new HTTPException(400, { message: 'The resource to be update does not exist.' });
      }

      await db.result.delete({
        where: {
          id: exisitingResult.id,
        },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error deleting result:', error);
      throw error;
    }
  }),

  deleteResults: privateProcedure.input(DeleteResultsSchema).mutation(async ({ c, input }) => {
    const { resultIds } = input;

    try {
      const existingResults = await db.result.findMany({
        where: {
          id: { in: resultIds },
        },
      });

      if (!existingResults) {
        throw new HTTPException(404, { message: 'The resource to be deleted does not exist.' });
      }

      await db.result.deleteMany({
        where: { id: { in: resultIds } },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error deleting results:', error);
      throw error;
    }
  }),
});
