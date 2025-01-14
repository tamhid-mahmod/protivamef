import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export type NewDistrictSchemaType = zod.infer<typeof NewDistrictSchema>;

export type UpdateDistrictSchemaType = NewDistrictSchemaType & {
  districtId: string;
};

export const NewDistrictSchema = zod.object({
  divisionName: zod.string().min(1, { message: 'Division name is required!' }),
  name: zod.string().min(1, { message: 'District name is required!' }),
});
