import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { getresultByStudentAId } from 'src/services/result';
import { GetCertificateSchema } from 'src/schemas/certificate';

import { router } from '../__internals/router';
import { privateProcedure } from '../procedures';

// ----------------------------------------------------------------------

export const certificateRouter = router({
  getCertificate: privateProcedure.input(GetCertificateSchema).mutation(async ({ c, input }) => {
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
      throw new HTTPException(404, { message: 'Student not found!' });
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

    const produceCetificate = {
      ...exisitingResult,
      student: {
        ...existingStudent,
        centre,
        course,
      },
    };

    return c.json({ certificate: produceCetificate });
  }),
});
