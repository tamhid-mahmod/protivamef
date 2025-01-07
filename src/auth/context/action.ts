import bcrypt from 'bcryptjs';

import { db } from 'src/lib/db';
import { getUserByEmail } from 'src/services/user';

import { NewUserSchema, type NewUserSchemaType } from 'src/sections/user/schema';

import { setSession } from './utils';

// ----------------------------------------------------------------------

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async (params: NewUserSchemaType) => {
  const validatedFileds = NewUserSchema.safeParse(params);

  if (!validatedFileds.success) {
    return { error: 'Invalid input fields.' };
  }

  const { email, password, name, isVerified } = validatedFileds.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const exisitngUser = await getUserByEmail(email);

  if (exisitngUser) {
    return { error: 'User already exists.' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      emailVerified: isVerified ? new Date() : null,
    },
  });

  return { success: 'User successfully created.' };
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
