import { z as zod } from 'zod';

import { db } from 'src/lib/db';
import { NewStudentSchema } from 'src/schemas/student';

import { router } from '../__internals/router';
import { publicProcedure } from '../procedures';

// ----------------------------------------------------------------------

export const studentRouter = router({
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

      const latestRoll = await db.student.findFirst({
        where: { rollNumber: { gte: '01000000' } }, // Only consider new 6-digit roll numbers
        orderBy: { rollNumber: 'desc' }, // Get the highest roll number
      });

      // Start roll numbers from 100001 if no new students exist
      let newRollNumber: string;
      if (!latestRoll || !latestRoll.rollNumber) {
        newRollNumber = '01000001';
      } else {
        // Increment the roll number and ensure it's a 6-digit string
        const nextRoll = parseInt(latestRoll.rollNumber, 10) + 1;
        newRollNumber = nextRoll.toString().padStart(8, '0');
      }

      const student = await db.student.create({
        data: {
          rollNumber: newRollNumber,
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
});
