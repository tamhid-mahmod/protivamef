import { z as zod } from 'zod';
import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { getDivisionByName } from 'src/services/division';
import { getDistrictById, getDistrictWithDivisionByName } from 'src/services/district';
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
    const districts = await db.district.findMany({ orderBy: { updatedAt: 'desc' } });

    return c.superjson({ districts });
  }),

  createDistrict: privateProcedure.input(NewDistrictSchema).mutation(async ({ c, input }) => {
    const { divisionName, name } = input;

    const isDivisionExists = await getDivisionByName(divisionName);

    if (!isDivisionExists) {
      throw new HTTPException(404, { message: 'The requested division could not be found.' });
    }

    const isDistrictWithDivisionExists = await getDistrictWithDivisionByName(divisionName, name);

    if (isDistrictWithDivisionExists) {
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

  updateDistrict: privateProcedure.input(UpdateDistrictSchema).mutation(async ({ c, input }) => {
    const { districtId, name } = input;

    const district = await getDistrictById(districtId);

    if (!district) {
      throw new HTTPException(404, { message: 'The requested district could not be found.' });
    }

    const isDistrictWithDivisionExists = await getDistrictWithDivisionByName(
      district.divisionName,
      name
    );

    if (isDistrictWithDivisionExists) {
      throw new HTTPException(409, {
        message:
          'A district with this name already exists with the same division. Please choose a different name or division.',
      });
    }

    await db.district.update({
      where: {
        id: districtId,
        divisionName: district.divisionName,
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
