import type { ICategoryItem } from 'src/types/category';

import { db } from 'src/lib/db';

// ----------------------------------------------------------------------

/**
 * Checks for conflicting data in the `category` table based on the provided criteria.
 *
 * @param {string} name - The name of the category.
 * @returns {Promise<ICategoryItem | null>} - The found centre or null if no match.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const isDataConflict = async (name: string): Promise<ICategoryItem | null> => {
  try {
    // Check for a centre with matching criteria
    const category = await db.category.findUnique({
      where: {
        name,
      },
    });

    return category;
  } catch (error) {
    console.error('Error checking data conflict:', error);
    throw new Error('Could not verify data conflict.');
  }
};
