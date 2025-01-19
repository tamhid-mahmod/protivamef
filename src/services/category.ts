import type { ICategoryItem } from 'src/types/category';

import { db } from 'src/lib/db';

// ----------------------------------------------------------------------

/**
 * Checks for conflicting data in the `category` table based on the provided criteria.
 *
 * @param {string} name - The name of the category.
 * @returns {Promise<ICategoryItem | null>} - The found centre or null if no match.
 * @param {string} excludeId - The ID of the category to exclude from the check.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const isDataConflict = async (
  name: string,
  excludeId?: string
): Promise<ICategoryItem | null> => {
  try {
    // Check for a centre with matching criteria
    const category = await db.category.findUnique({
      where: {
        name,
        NOT: { id: excludeId },
      },
    });

    return category;
  } catch (error) {
    console.error('Error checking data conflict:', error);
    throw new Error('Could not verify data conflict.');
  }
};

// ----------------------------------------------------------------------

/**
 * Retrieves a category from the database by its unique identifier.
 *
 * @param {string} id - The unique identifier of the category to be retrieved.
 * @returns {Promise<ICategoryItem | null>} - A promise that resolves to the centre object if found, or `null` if no match exists.
 * @throws {Error} - Throws an error if the database query fails.
 */
export const getCategoryById = async (id: string): Promise<ICategoryItem | null> => {
  try {
    // Check for a centre with matching criteria
    const category = await db.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  } catch (error) {
    console.error('Error retrieving category by ID:', error);
    throw new Error('Could not verify data.');
  }
};
