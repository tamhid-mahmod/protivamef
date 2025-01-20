import type { ICourseItem } from 'src/types/course';

import { db } from 'src/lib/db';

// ----------------------------------------------------------------------

/**
 * Checks for conflicting data in the `course` table based on the provided criteria.
 *
 * @param {string} code - The code of the course.
 * @param {string} excludeId - The ID of the course to exclude from the check.
 * @returns {Promise<ICourseItem | null>} - The found course or null if no match.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const isDataConflict = async (
  code: string,
  excludeId?: string
): Promise<ICourseItem | null> => {
  try {
    // Check for a course with matching criteria
    const course = await db.course.findUnique({
      where: {
        code,
        NOT: { id: excludeId },
      },
    });

    if (!course) {
      return null;
    }

    // Map the course object to match the ICourseItem interface
    const transformedCourse: ICourseItem = {
      ...course,
      fee: course.fee.toNumber(),
      feeBase: course.feeBase ? course.feeBase.toNumber() : null,
    };

    return transformedCourse;
  } catch (error) {
    console.error('Error checking data conflict:', error);
    throw new Error('Could not verify data conflict.');
  }
};

// ----------------------------------------------------------------------

/**
 * Retrieves a course from the database by its unique identifier.
 *
 * @param {string} id - The unique identifier of the course to be retrieved.
 * @returns {Promise<ICourseItem | null>} - A promise that resolves to the course object if found, or `null` if no match exists.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const getCourseById = async (id: string): Promise<ICourseItem | null> => {
  try {
    // Check for a course with matching criteria
    const course = await db.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) {
      return null;
    }

    // Map the course object to match the ICourseItem interface
    const transformedCourse: ICourseItem = {
      ...course,
      fee: course.fee.toNumber(),
      feeBase: course.feeBase ? course.feeBase.toNumber() : null,
    };

    return transformedCourse;
  } catch (error) {
    console.error('Error retrieving centre by ID:', error);
    throw new Error('Could not verify data.');
  }
};
