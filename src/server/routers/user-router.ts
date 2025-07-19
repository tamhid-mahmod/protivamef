import bcrypt from 'bcryptjs';
import { HTTPException } from 'hono/http-exception';

import { db } from 'src/lib/db';
import { getUserById } from 'src/services/user';

import { ChangePasswordSchema } from 'src/sections/user/schema';

import { auth } from 'src/auth/auth';

import { router } from '../__internals/router';
import { privateProcedure } from '../procedures';

// ----------------------------------------------------------------------

export const UserRouter = router({
  changePassword: privateProcedure.input(ChangePasswordSchema).mutation(async ({ c, input }) => {
    const { oldPassword, newPassword } = input;

    try {
      const session = await auth();

      if (!session) {
        throw new HTTPException(401, { message: 'Unauthorized!' });
      }

      const user = await getUserById(session.user?.id || '');

      if (!user) {
        throw new HTTPException(401, { message: 'Unauthorized!' });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password!);

      if (!isMatch) {
        throw new HTTPException(401, { message: 'Incorrect password!' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error change password:', error);
      throw error;
    }
  }),
});
