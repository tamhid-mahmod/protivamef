import { z as zod } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { getDivisionById } from 'src/services/division';
import { getDistrictById, getDistrictWithDivisionId } from 'src/services/district';
import {
  NewDistrictSchema,
  UpdateDistrictSchema,
  DeleteDistrictsSchema,
} from 'src/schemas/district';

import { router } from '../__internals/router';
import { publicProcedure, privateProcedure } from '../procedures';

// ----------------------------------------------------------------------

export const districtRouter = router({
  getDistricts: publicProcedure.query(async ({ c }) => {
    const districts = await db.district.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    return c.superjson({ districts });
  }),

  getDistrictsByDivision: publicProcedure
    .input(zod.object({ divisionId: zod.string() }))
    .query(async ({ c, input }) => {
      const { divisionId } = input;

      const districts = await db.district.findMany({
        where: {
          divisionId,
        },
      });

      return c.json({ districts });
    }),

  getDistrictsWithDivision: publicProcedure.query(async ({ c }) => {
    const districts = await db.district.findMany({
      include: {
        division: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return c.superjson({ districts });
  }),

  createDistrict: privateProcedure.input(NewDistrictSchema).mutation(async ({ c, input }) => {
    const { division: inputDevision, name } = input;

    const division = await getDivisionById(inputDevision.id);

    if (!division) {
      throw new HTTPException(404, { message: 'The requested division could not be found.' });
    }

    const districtWithDivision = await getDistrictWithDivisionId(division.id, name);

    if (districtWithDivision) {
      throw new HTTPException(409, {
        message:
          'A district with this name already exists with the same division. Please choose a different name or division.',
      });
    }

    const newDistrict = await db.district.create({
      data: {
        divisionId: division.id,
        name,
      },
    });

    return c.json({ newDistrict });
  }),

  updateDistrict: privateProcedure.input(UpdateDistrictSchema).mutation(async ({ c, input }) => {
    const { districtId, name } = input;

    const district = await getDistrictById(districtId);

    if (!district) {
      throw new HTTPException(404, { message: 'The requested district could not be found.' });
    }

    const districtWithDivision = await getDistrictWithDivisionId(district.id, name);

    if (districtWithDivision) {
      throw new HTTPException(409, {
        message:
          'A district with this name already exists with the same division. Please choose a different name or division.',
      });
    }

    await db.district.update({
      where: {
        id: districtId,
        divisionId: district.divisionId,
      },
      data: {
        ...(name && { name }),
      },
    });

    return c.json({ success: true });
  }),

  deleteDistrict: privateProcedure
    .input(zod.object({ districtId: zod.string() }))
    .mutation(async ({ c, input }) => {
      const { districtId } = input;

      const district = await getDistrictById(districtId);

      if (!district) {
        throw new HTTPException(404, { message: 'The requested district could not be found.' });
      }

      await db.district.delete({
        where: { id: district.id },
      });

      return c.json({ success: true });
    }),

  deleteDistricts: privateProcedure.input(DeleteDistrictsSchema).mutation(async ({ c, input }) => {
    const { districtIds } = input;

    const districts = await db.district.findMany({
      where: {
        id: { in: districtIds },
      },
    });

    if (districts.length !== districtIds.length) {
      throw new HTTPException(404, { message: 'One or more districts could not be found.' });
    }

    await db.district.deleteMany({
      where: { id: { in: districtIds } },
    });

    return c.json({ success: true });
  }),
});
