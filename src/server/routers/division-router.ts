import { z as zod } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { NewDivisionSchema } from 'src/schemas/division';
import { getDivisionById, getDivisionByName } from 'src/services/division';

import { router } from '../__internals/router';
import { publicProcedure, privateProcedure } from '../procedures';

// ----------------------------------------------------------------------

export const divisionRouter = router({
  getDivisions: publicProcedure.query(async ({ c }) => {
    const divisions = await db.division.findMany({ orderBy: { updatedAt: 'desc' } });

    return c.superjson({ divisions });
  }),

  getDivisionsWithDistricts: publicProcedure.query(async ({ c }) => {
    const divisionsWithDistricts = await db.division.findMany({
      include: {
        districts: {
          select: {
            id: true,
            name: true,
            divisionId: true,
          },
        },
      },
    });

    return c.superjson({ divisionsWithDistricts });
  }),

  createDivision: privateProcedure.input(NewDivisionSchema).mutation(async ({ c, input }) => {
    const { name } = input;

    const isDivisionExists = await getDivisionByName(name);

    if (isDivisionExists) {
      throw new HTTPException(409, {
        message: 'A division with this name already exists. Please choose a different name.',
      });
    }

    const newDivision = await db.division.create({
      data: {
        name,
      },
    });

    return c.json({ newDivision });
  }),

  updateDivision: privateProcedure
    .input(zod.object({ divisionId: zod.string(), ...NewDivisionSchema.shape }))
    .mutation(async ({ c, input }) => {
      const { divisionId, name } = input;

      const division = await getDivisionById(divisionId);

      if (!division) {
        throw new HTTPException(404, { message: 'The requested division could not be found.' });
      }

      if (division.name === name) {
        throw new HTTPException(409, {
          message: 'A division with this name already exists. Please choose a different name.',
        });
      }

      const updatedDivision = await db.division.update({
        where: { id: division.id },
        data: {
          ...(name && { name }),
        },
      });

      return c.json({ success: true, division: updatedDivision });
    }),

  deleteDivision: privateProcedure
    .input(zod.object({ divisionId: zod.string() }))
    .mutation(async ({ c, input }) => {
      const { divisionId } = input;

      const division = await getDivisionById(divisionId);

      if (!division) {
        throw new HTTPException(404, { message: 'The requested division could not be found.' });
      }

      await db.division.delete({
        where: { id: division.id },
      });

      return c.json({ success: true });
    }),
});
