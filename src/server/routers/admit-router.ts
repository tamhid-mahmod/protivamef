import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { GetAdmitSchema } from 'src/schemas/admit';

import { router } from '../__internals/router';
import { privateProcedure } from '../procedures';

// ----------------------------------------------------------------------

export const admitRouter = router({
  getAdmit: privateProcedure.input(GetAdmitSchema).mutation(async ({ c, input }) => {
    const { studentAId } = input;

    const existingStudent = await db.student.findUnique({
      where: {
        studentAId,
      },
      include: {
        appliedFor: true,
      },
    });

    if (!existingStudent) {
      throw new HTTPException(404, { message: 'Student not found!' });
    }

    if (!existingStudent.session) {
      throw new HTTPException(400, { message: "Student don't have session!" });
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

    const produceAdmit = {
      ...existingStudent,
      centre,
      course,
    };

    return c.json({ admit: produceAdmit });
  }),
});
