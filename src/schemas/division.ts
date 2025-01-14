import { z as zod } from 'zod';

// ----------------------------------------------------------------------

export type NewDivisionSchemaType = zod.infer<typeof NewDivisionSchema>;

export type UpdateDivisionSchemaType = NewDivisionSchemaType & {
  divisionId: string;
};

export const NewDivisionSchema = zod.object({
  name: zod.string().min(1, { message: 'Division name is required!' }),
});
