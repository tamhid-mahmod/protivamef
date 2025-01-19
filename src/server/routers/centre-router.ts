import { z as zod } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { getCentreById, isDataConflict } from 'src/services/centre';
import {
  NewCentreSchema,
  UpdateCentreSchema,
  DeleteCentreSchema,
  DeleteCentresSchema,
} from 'src/schemas/centre';

import { router } from '../__internals/router';
import { publicProcedure, privateProcedure } from '../procedures';
// ----------------------------------------------------------------------

export const centreRouter = router({
  centreDetails: publicProcedure
    .input(zod.object({ centreId: zod.string().min(1) }))
    .query(async ({ c, input }) => {
      const { centreId } = input;

      const centre = await getCentreById(centreId);

      if (!centre) {
        throw new HTTPException(404, { message: 'The resource does not exist.' });
      }

      return c.json({ centre });
    }),

  getCentresWithDivisionAndDistrict: privateProcedure.query(async ({ c }) => {
    const centres = await db.centre.findMany({
      include: {
        division: true,
        district: true,
      },
    });

    return c.superjson({ centres });
  }),

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

  updateCentre: privateProcedure.input(UpdateCentreSchema).mutation(async ({ c, input }) => {
    const { centreId, name, code, email, phoneNumber, address, divisionId, districtId, publish } =
      input;

    try {
      const existingCentre = await getCentreById(centreId);

      if (!existingCentre) {
        throw new HTTPException(404, { message: 'The resource to be update does not exist.' });
      }

      const existingConflictCentre = await isDataConflict(code, email, existingCentre.id);

      if (existingConflictCentre) {
        throw new HTTPException(409, { message: 'Centre with similar data already exists.' });
      }

      await db.centre.update({
        where: {
          id: centreId,
        },
        data: {
          ...(name && { name }),
          ...(code && { code }),
          ...(email && { email }),
          ...(phoneNumber && { phoneNumber }),
          ...(address && { address }),
          ...(divisionId && { divisionId }),
          ...(districtId && { districtId }),
          ...(publish !== undefined && { publish }),
        },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error updating centre:', error);
      throw error;
    }
  }),

  deleteCentre: privateProcedure.input(DeleteCentreSchema).mutation(async ({ c, input }) => {
    const { centreId } = input;

    try {
      const existingCentre = await getCentreById(centreId);

      if (!existingCentre) {
        throw new HTTPException(404, { message: 'The resource to be deleted does not exist.' });
      }

      await db.centre.delete({
        where: {
          id: existingCentre.id,
        },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error deleting centre:', error);
      throw error;
    }
  }),

  deleteCentres: privateProcedure.input(DeleteCentresSchema).mutation(async ({ c, input }) => {
    const { centreIds } = input;

    try {
      const existingCentres = await db.centre.findMany({
        where: {
          id: { in: centreIds },
        },
      });

      if (!existingCentres) {
        throw new HTTPException(404, { message: 'The resource to be deleted does not exist.' });
      }

      await db.centre.deleteMany({
        where: { id: { in: centreIds } },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error deleting centres:', error);
      throw error;
    }
  }),
});
