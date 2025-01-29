import type { IStudentItem, IStudentEducationBackgroundItem } from 'src/types/student';

import { db } from 'src/lib/db';

// ----------------------------------------------------------------------

/**
 * Retrieves a student from the database by its unique identifier.
 *
 * @param {string} id - The unique identifier of the student to be retrieved.
 * @returns {Promise<Object | null>} - A promise that resolves to the student object if found, or `null` if no match exists.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const getStudentById = async (id: string): Promise<IStudentItem | null> => {
  try {
    // Check for a centre with matching criteria
    const student = await db.student.findUnique({
      where: {
        id,
      },
    });

    return student;
  } catch (error) {
    console.error('Error retrieving student by ID:', error);
    throw new Error('Could not verify data.');
  }
};

// ----------------------------------------------------------------------

/**
 * Retrieves a student from the database by its unique identifier.
 *
 * @param {string} studentAId - The unique identifier of the student to be retrieved.
 * @returns {Promise<Object | null>} - A promise that resolves to the student object if found, or `null` if no match exists.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const getStudentByStudentAId = async (studentAId: string): Promise<IStudentItem | null> => {
  try {
    // Check for a centre with matching criteria
    const student = await db.student.findUnique({
      where: {
        studentAId,
      },
    });

    return student;
  } catch (error) {
    console.error('Error retrieving student by SudentAId:', error);
    throw new Error('Could not verify data.');
  }
};

// ----------------------------------------------------------------------

/**
 * Retrieves a student education from the database by its unique identifier.
 *
 * @param {string} id - The unique identifier of the student education to be retrieved.
 * @returns {Promise<Object | null>} - A promise that resolves to the student education object if found, or `null` if no match exists.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const getStudentEducationById = async (
  id: string
): Promise<IStudentEducationBackgroundItem | null> => {
  try {
    // Check for a centre with matching criteria
    const studentEducation = await db.studentEducationBackground.findUnique({
      where: {
        id,
      },
    });

    return studentEducation;
  } catch (error) {
    console.error('Error retrieving student education by ID:', error);
    throw new Error('Could not verify data.');
  }
};
