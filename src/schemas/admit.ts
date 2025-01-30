import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export type GetAdmitSchemaType = zod.infer<typeof GetAdmitSchema>;

export const GetAdmitSchema = zod.object({
  studentAId: zod.string().min(1, { message: 'Stident ID is required!' }),
});
