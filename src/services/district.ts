import { db } from 'src/lib/db';

// ----------------------------------------------------------------------

export const getDivisionWithDistrictByName = async (divisionName: string, name: string) => {
  try {
    const district = await db.district.findUnique({ where: { divisionName, name } });

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
