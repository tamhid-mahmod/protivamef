import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { NewCentreSchema } from 'src/schemas/centre';
import { isDataConflict } from 'src/services/centre';

import { router } from '../__internals/router';
import { privateProcedure } from '../procedures';
// ----------------------------------------------------------------------

export const centreRouter = router({
  createCentre: privateProcedure.input(NewCentreSchema).mutation(async ({ c, input }) => {
    const { name, code, email, phoneNumber, address, divisionId, districtId, publish } = input;

    try {
      // Check if a centre with the same code or email already exists
      const existingCentre = await isDataConflict(code, email);

      if (existingCentre) {
        throw new HTTPException(409, { message: 'Centre with similar data already exists.' });
      }

      // Insert the new centre into the database
      const newCentre = await db.centre.create({
        data: {
          name,
          code,
          email,
          phoneNumber,
          address,
          divisionId,
          districtId,
          publish,
        },
      });

      return c.json({ success: true, data: newCentre }, 201);
    } catch (error) {
      console.error('Error creating centre:', error);
      throw error;
    }
  }),
});
