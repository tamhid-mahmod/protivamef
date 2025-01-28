import dayjs from 'dayjs';
import { z as zod } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

// ----------------------------------------------------------------------

export type NewStudentSchemaType = zod.infer<typeof NewStudentSchema>;

export const NewStudentSchema = zod.object({
  fullName: zod
    .string()
    .min(1, { message: 'Full name is required!' })
    .max(32, { message: 'Maximum 32 characters!' }),
  dateOfBirth: zod.coerce
    .date()
    .nullable()
    .transform((dateString, ctx) => {
      const date = dayjs(dateString).format();

      const stringToDate = zod.string().pipe(zod.coerce.date());

      if (!dateString) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'Date of birth is required!',
        });
        return null;
      }

      if (!stringToDate.safeParse(date).success) {
        ctx.addIssue({
          code: zod.ZodIssueCode.invalid_date,
          message: 'Invalid Date!!',
        });
      }

      return date;
    })
    .pipe(zod.union([zod.number(), zod.string(), zod.date(), zod.null()])),
  gender: zod.string().min(1, { message: 'Gender is required!' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  religion: zod.string().min(1, { message: 'Religion is required!' }),
  fatherName: zod.string().min(1, { message: "Father's name is required!" }),
  motherName: zod.string().min(1, { message: "Mother's name is required!" }),
  examination: zod.string().min(1, { message: 'Examination is required!' }),
  board: zod.string().min(1, { message: 'Board is required!' }),
  passYear: zod.string().min(1, { message: 'Year is required!' }),
  roll: zod.string().min(1, { message: 'Roll is required!' }),
  result: zod.string().min(1, { message: 'Result is required!' }),
  division: zod.string().min(1, { message: 'Division is required!' }),
  district: zod.string().min(1, { message: 'District is required!' }),
  centre: zod.string().min(1, { message: 'Centre is required!' }),
  course: zod.string().min(1, { message: 'Course is required!' }),
  imageUrl: zod.custom<File | string | null>().transform((data, ctx) => {
    const hasFile = data instanceof File || (typeof data === 'string' && !!data.length);

    if (!hasFile) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: 'Passport size photo is required!',
      });
      return null;
    }

    return data;
  }),
  iAgree: zod.boolean({ coerce: true }).refine((val) => val === true, {
    message: 'You have to accept our rules!',
  }),

  // optional
  email: zod
    .string()
    .email({ message: 'Email must be a valid email address!' })
    .or(zod.literal(''))
    .nullable()
    .optional(),
  phoneNumber: zod
    .string({
      invalid_type_error: 'Invalid phone number!',
    })
    .refine((data) => isValidPhoneNumber(data), {
      message: 'Invalid phone number!',
    })
    .or(zod.literal(''))
    .nullable()
    .optional(),
});
