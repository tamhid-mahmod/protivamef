import { Decimal } from 'decimal.js';
import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { NewResultSchema } from 'src/schemas/result';
import { getresultByStudentAId } from 'src/services/result';
import { getStudentByStudentAId } from 'src/services/student';

import { router } from '../__internals/router';
import { privateProcedure } from '../procedures';

// ----------------------------------------------------------------------

export const resultRouter = router({
  publushResult: privateProcedure.input(NewResultSchema).mutation(async ({ c, input }) => {
    const { studentAId, mark, createdAt } = input;

    try {
      const existingStudent = await getStudentByStudentAId(studentAId);

      if (!existingStudent) {
        throw new HTTPException(404, { message: 'Student not exist!' });
      }

      const existingResult = await getresultByStudentAId(studentAId);

      if (existingResult) {
        throw new HTTPException(409, { message: 'Result already published!' });
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
});
