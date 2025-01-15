import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export type NewDistrictSchemaType = zod.infer<typeof NewDistrictSchema>;

export type UpdateDistrictSchemaType = zod.infer<typeof UpdateDistrictSchema>;

export type DeleteDistrictsSchemaType = zod.infer<typeof DeleteDistrictsSchema>;

export const NewDistrictSchema = zod.object({
  divisionName: zod.string().min(1, { message: 'Division name is required!' }),
  name: zod.string().min(1, { message: 'District name is required!' }),
});

export const UpdateDistrictSchema = zod.object({
  districtId: zod.string().min(1, { message: 'District is is required!' }),
  ...NewDistrictSchema.shape,
});

export const DeleteDistrictsSchema = zod.object({
  districtIds: zod
    .array(zod.string().min(1, { message: 'ID is required!' }))
    .nonempty({ message: 'At least one ID is required!' }),
});
