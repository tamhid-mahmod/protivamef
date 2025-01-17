import { z as zod } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

// ----------------------------------------------------------------------

export type NewCentreSchemaType = zod.infer<typeof NewCentreSchema>;

export const NewCentreSchema = zod.object({
  name: zod.string().min(1, { message: 'Centre name is required!' }),
  code: zod
    .string()
    .min(1, { message: 'Centre code is required!' })
    .min(3, { message: 'Code must be at least 3 characters!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phoneNumber: zod
    .string({
      required_error: 'Phone number is required!',
      invalid_type_error: 'Invalid phone number!',
    })
    .min(1, { message: 'Phone number is required!' })
    .refine((data) => isValidPhoneNumber(data), {
      message: 'Invalid phone number!',
    }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  divisionId: zod.string().min(1, { message: 'Division is required!' }),
  districtId: zod.string().min(1, { message: 'District is required!' }),
  publish: zod.enum(['draft', 'published']),
});

// ----------------------------------------------------------------------

export type UpdateCentreSchemaType = zod.infer<typeof UpdateCentreSchema>;

export const UpdateCentreSchema = zod.object({
  centreId: zod.string().min(1, { message: 'Centre id is required!' }),
  ...NewCentreSchema.shape,
});

// ----------------------------------------------------------------------

export type DeleteCentreSchemaType = zod.infer<typeof DeleteCentreSchema>;

export const DeleteCentreSchema = zod.object({
  centreId: zod.string().min(1, { message: 'Centre id is required!' }),
});

// ----------------------------------------------------------------------

export type DeleteCentresSchemaType = zod.infer<typeof DeleteCentresSchema>;

export const DeleteCentresSchema = zod.object({
  centreIds: zod
    .array(zod.string().min(1, { message: 'Centres id is required!' }))
    .nonempty({ message: 'At least one ID is required!' }),
});
