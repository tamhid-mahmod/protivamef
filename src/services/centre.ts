import { db } from 'src/lib/db';

// ----------------------------------------------------------------------

/**
 * Checks for conflicting data in the `centre` table based on the provided criteria.
 *
 * @param {string} code - The code of the centre.
 * @param {string} email - The email of the centre.
 * @returns {Promise<Object | null>} - The found centre or null if no match.
 */
export const isDataConflict = async (
  code: string,
  email: string
): Promise<object | null> => {
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
