import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export type GetCertificateSchemaType = zod.infer<typeof GetCertificateSchema>;

export const GetCertificateSchema = zod.object({
  studentAId: zod.string().min(1, { message: 'Stident ID is required!' }),
});
