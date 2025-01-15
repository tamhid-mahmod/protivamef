import { db } from 'src/lib/db';

// ----------------------------------------------------------------------

export const getDistrictWithDivisionId = async (divisionId: string, name: string) => {
  try {
    const district = await db.district.findFirst({ where: { divisionId, name } });

    return district;
  } catch {
    return null;
  }
};

export const getDistrictById = async (id: string) => {
  try {
    const district = await db.district.findUnique({ where: { id } });

    return district;
  } catch {
    return null;
  }
};
