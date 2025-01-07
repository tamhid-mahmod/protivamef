'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

import { db } from 'src/lib/db';
import { getUserByEmail } from 'src/services/user';
import { SignInSchema, type SignInSchemaType } from 'src/schemas/user';

import { NewUserSchema, type NewUserSchemaType } from 'src/sections/user/schema';

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from '../auth';

// ----------------------------------------------------------------------

/** **************************************
 * Sign in
 *************************************** */
export const signIn = async (params: SignInSchemaType) => {
  const validatedFileds = SignInSchema.safeParse(params);

  if (!validatedFileds.success) {
    return { error: 'Invalid input fields.' };
  }

  const { email, password } = validatedFileds.data;

  try {
    await nextAuthSignIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }

  return { success: 'Authenticated successfully!' };
};

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
  await nextAuthSignOut();
};
