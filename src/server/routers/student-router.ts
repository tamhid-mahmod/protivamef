import type { ICourseItem } from 'src/types/course';
import type { IStudentAllItem } from 'src/types/student';

import { z as zod } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { getStudentById, getStudentEducationById } from 'src/services/student';
import {
  NewStudentSchema,
  DeleteStudentSchema,
  DeleteStudentsSchema,
  UpdateStudentEducationSchema,
  UpdateStudentInformationSchema,
} from 'src/schemas/student';

import { router } from '../__internals/router';
import { publicProcedure, privateProcedure } from '../procedures';

// ----------------------------------------------------------------------

export const studentRouter = router({
  getStudents: privateProcedure.query(async ({ c }) => {
    const students = await db.student.findMany({
      include: {
        educationBackground: true,
        appliedFor: true,
      },
    });

    const produceStudent: IStudentAllItem[] = await Promise.all(
      students.map(async (student) => {
        const division = await db.division.findUnique({
          where: {
            id: student?.appliedFor.divisionId,
          },
        });

        const district = await db.district.findUnique({
          where: {
            id: student?.appliedFor.districtId,
          },
        });

        const centre = await db.centre.findUnique({
          where: {
            id: student?.appliedFor.centreId,
            publish: 'published',
          },
        });

        const course = await db.course.findUnique({
          where: {
            id: student?.appliedFor.courseId,
            publish: 'published',
          },
        });

        if (division && district && centre && course) {
          const transformedCourse: ICourseItem = {
            ...course,
            fee: course?.fee.toNumber(),
            feeBase: course?.feeBase ? course.feeBase.toNumber() : null,
          };

          return {
            ...student,
            division,
            district,
            centre,
            course: transformedCourse,
          };
        }
        return {
          ...student,
          division,
          district,
          centre,
          course: null,
        };
      })
    );

    return c.superjson({ students: produceStudent });
  }),

  studentDetails: publicProcedure
    .input(zod.object({ studentId: zod.string() }))
    .query(async ({ c, input }) => {
      const { studentId } = input;

      const student = await db.student.findUnique({
        where: {
          id: studentId,
        },
        include: {
          educationBackground: true,
          appliedFor: true,
        },
      });

      const division = await db.division.findUnique({
        where: {
          id: student?.appliedFor.divisionId,
        },
      });

      const district = await db.district.findUnique({
        where: {
          id: student?.appliedFor.districtId,
        },
      });

      const centre = await db.centre.findUnique({
        where: {
          id: student?.appliedFor.centreId,
          publish: 'published',
        },
      });

      const course = await db.course.findUnique({
        where: {
          id: student?.appliedFor.courseId,
          publish: 'published',
        },
      });

      const produceStudent = {
        ...student,
        division,
        district,
        centre,
        course,
      };

      return c.superjson({ student: produceStudent });
    }),

  createStudent: publicProcedure.input(NewStudentSchema).mutation(async ({ c, input }) => {
    const {
      fullName,
      dateOfBirth,
      gender,
      address,
      religion,
      fatherName,
      motherName,
      examination,
      board,
      passYear,
      roll,
      result,
      division: divisionId,
      district: districtId,
      centre: centreId,
      course: courseId,
      imageUrl,
      iAgree,
      email,
      phoneNumber,
    } = input;

    try {
      const educationBackground = await db.studentEducationBackground.create({
        data: {
          examination,
          board,
          passYear,
          roll,
          result,
        },
      });

      const appliedFor = await db.studentAppliedFor.create({
        data: {
          divisionId,
          districtId,
          centreId,
          courseId,
        },
      });

      const latestId = await db.student.findFirst({
        where: { studentAId: { gte: '01000000' } }, // Only consider new 6-digit roll numbers
        orderBy: { studentAId: 'desc' }, // Get the highest roll number
      });

      // Start roll numbers from 100001 if no new students exist
      let newStudentId: string;
      if (!latestId || !latestId.studentAId) {
        newStudentId = '01000001';
      } else {
        // Increment the roll number and ensure it's a 6-digit string
        const nextId = parseInt(latestId.studentAId, 10) + 1;
        newStudentId = nextId.toString().padStart(8, '0');
      }

      const student = await db.student.create({
        data: {
          studentAId: newStudentId,
          imageUrl: imageUrl as string,
          fullName,
          dateOfBirth: dateOfBirth as Date,
          gender,
          email,
          phoneNumber,
          address,
          religion,
          fatherName,
          motherName,
          iAgree,
          studentEducationBackgroundId: educationBackground.id,
          studentAppliedForId: appliedFor.id,
        },
      });

      return c.json({ success: true, student }, 201);
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }),

  updateStudentInformation: privateProcedure
    .input(UpdateStudentInformationSchema)
    .mutation(async ({ c, input }) => {
      const {
        id,
        fullName,
        dateOfBirth,
        gender,
        address,
        religion,
        fatherName,
        motherName,
        status,
        imageUrl,
        session,
      } = input;

      try {
        const existingStudent = await getStudentById(id);

        if (!existingStudent) {
          throw new HTTPException(404, { message: 'The resource to be update does not exist.' });
        }

        await db.student.update({
          where: {
            id,
          },
          data: {
            ...(fullName && { fullName }),
            ...(dateOfBirth && { dateOfBirth: dateOfBirth as Date }),
            ...(gender && { gender }),
            ...(religion && { religion }),
            ...(address && { address }),
            ...(fatherName && { fatherName }),
            ...(motherName && { motherName }),
            ...(status && { status }),
            ...(imageUrl && { imageUrl: imageUrl as string }),
            ...(session && { session }),
          },
        });

        return c.json({ success: true });
      } catch (error) {
        console.error('Error updating student:', error);
        throw error;
      }
    }),

  updateStudentEducation: privateProcedure
    .input(UpdateStudentEducationSchema)
    .mutation(async ({ c, input }) => {
      const { id, examination, board, passYear } = input;

      try {
        const existingStudentEducation = await getStudentEducationById(id);

        if (!existingStudentEducation) {
          throw new HTTPException(404, { message: 'The resource to be update does not exist.' });
        }

        await db.studentEducationBackground.update({
          where: {
            id,
          },
          data: {
            ...(examination && { examination }),
            ...(board && { board }),
            ...(passYear && { passYear }),
          },
        });

        return c.json({ success: true });
      } catch (error) {
        console.error('Error updating student education:', error);
        throw error;
      }
    }),

  deleteStudent: privateProcedure.input(DeleteStudentSchema).mutation(async ({ c, input }) => {
    const { studentId } = input;

    try {
      const existingStudent = await getStudentById(studentId);

      if (!existingStudent) {
        throw new HTTPException(404, { message: 'The resource to be deleted does not exist.' });
      }

      await db.student.delete({
        where: {
          id: existingStudent.id,
        },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }),

  deleteStudents: privateProcedure.input(DeleteStudentsSchema).mutation(async ({ c, input }) => {
    const { studentIds } = input;

    try {
      const existingStudents = await db.student.findMany({
        where: {
          id: { in: studentIds },
        },
      });

      if (!existingStudents) {
        throw new HTTPException(404, { message: 'The resource to be deleted does not exist.' });
      }

      await db.student.deleteMany({
        where: { id: { in: studentIds } },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error deleting students:', error);
      throw error;
    }
  }),
});
