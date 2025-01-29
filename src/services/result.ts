import type { IResultItem } from 'src/types/result';

import { db } from 'src/lib/db';

// ----------------------------------------------------------------------

/**
 * Retrieves a result from the database by its unique identifier.
 *
 * @param {string} id - The unique identifier of the result to be retrieved.
 * @returns {Promise<Object | null>} - A promise that resolves to the result object if found, or `null` if no match exists.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const getResultById = async (id: string): Promise<IResultItem | null> => {
  try {
    // Check for a centre with matching criteria
    const result = await db.result.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      return null;
    }

    // Map the course object to match the IResultItem interface
    const transformedResult: IResultItem = {
      ...result,
      mark: result?.mark.toNumber(),
    };

    return transformedResult;
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
export const getresultByStudentAId = async (studentAId: string): Promise<IResultItem | null> => {
  try {
    // Check for a centre with matching criteria
    const result = await db.result.findUnique({
      where: {
        studentAId,
      },
    });

    if (!result) {
      return null;
    }

    // Map the course object to match the IResultItem interface
    const transformedResult: IResultItem = {
      ...result,
      mark: result?.mark.toNumber(),
    };

    return transformedResult;
  } catch (error) {
    console.error('Error retrieving student by SudentAId:', error);
    throw new Error('Could not verify data.');
  }
};
