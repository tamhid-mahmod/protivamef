import type { ICentreItem } from 'src/types/centre';

import { db } from 'src/lib/db';

// ----------------------------------------------------------------------

/**
 * Checks for conflicting data in the `centre` table based on the provided criteria.
 *
 * @param {string} code - The code of the centre.
 * @param {string} email - The email of the centre.
 * @returns {Promise<Object | null>} - The found centre or null if no match.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const isDataConflict = async (code: string, email: string): Promise<ICentreItem | null> => {
  try {
    // Check for a centre with matching criteria
    const centre = await db.centre.findFirst({
      where: {
        OR: [{ code }, { email }],
      },
    });

    return centre;
  } catch (error) {
    console.error('Error checking data conflict:', error);
    throw new Error('Could not verify data conflict.');
  }
};

// ----------------------------------------------------------------------

/**
 * Retrieves a centre from the database by its unique identifier.
 *
 * @param {string} id - The unique identifier of the centre to be retrieved.
 * @returns {Promise<Object | null>} - A promise that resolves to the centre object if found, or `null` if no match exists.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const getCentreById = async (id: string): Promise<ICentreItem | null> => {
  try {
    // Check for a centre with matching criteria
    const centre = await db.centre.findUnique({
      where: {
        id,
      },
    });

    return centre;
  } catch (error) {
    console.error('Error retrieving centre by ID:', error);
    throw new Error('Could not verify data.');
  }
};
