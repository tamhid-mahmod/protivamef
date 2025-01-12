import { db } from 'src/lib/db';
import { NewDivisionSchema } from 'src/schemas/division';

import { router } from '../__internals/router';
import { privateProcedure } from '../procedures';

// ----------------------------------------------------------------------

export const divisionRouter = router({
  createDivision: privateProcedure.input(NewDivisionSchema).mutation(async ({ c, input }) => {
    try {
      const { name } = input;

      const division = await db.division.create({
        data: {
          name,
        },
      });

      return c.json({ division });
    } catch (error) {
      console.error('Internal server error', error);
      throw error;
    }
  }),
});
