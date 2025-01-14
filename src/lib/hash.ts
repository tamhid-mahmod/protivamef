'use server';

import argon2 from 'argon2';

// Hash a password
export async function hashPassword(password: string) {
  try {
    // Hash the password with Argon2
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (err) {
    console.error('Error hashing password:', err);
    throw new Error('Password hashing failed');
  }
}

// Verify a password against a hashed value
export async function verifyPassword(storedHash: string, password: string) {
  try {
    // Verify the password with the stored hash
    const isValid = await argon2.verify(storedHash, password);
    return isValid;
  } catch (err) {
    console.error('Error verifying password:', err);
    throw new Error('Password verification failed');
  }
}
