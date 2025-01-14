import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { NewDistrictSchema } from 'src/schemas/district';
import { getDivisionByName } from 'src/services/division';
import { getDivisionWithDistrictByName } from 'src/services/district';

import { router } from '../__internals/router';
import { publicProcedure, privateProcedure } from '../procedures';

// ----------------------------------------------------------------------

export const districtRouter = router({
  getDistricts: publicProcedure.query(async ({ c }) => {
    const districts = await db.district.findMany({ orderBy: { updatedAt: 'desc' } });

    return c.superjson({ districts });
  }),

  createDistrict: privateProcedure.input(NewDistrictSchema).mutation(async ({ c, input }) => {
    const { divisionName, name } = input;

    const isDivisionExists = await getDivisionByName(divisionName);

    if (!isDivisionExists) {
      throw new HTTPException(404, { message: 'The requested division could not be found.' });
    }

    const isDivisionWithDistrictExists = await getDivisionWithDistrictByName(divisionName, name);

    if (isDivisionWithDistrictExists) {
      throw new HTTPException(409, {
        message:
          'A district with this name already exists with the same division. Please choose a different name or division.',
      });
    }

    const newDistrict = await db.district.create({
      data: {
        divisionName,
        name,
      },
    });

    return c.json({ newDistrict });
  }),
});
