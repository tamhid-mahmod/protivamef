import { HTTPException } from 'hono/http-exception';

import { getUserById } from 'src/services/user';

import { auth } from 'src/auth/auth';

import { t } from './__internals/t';

// ----------------------------------------------------------------------

const authMiddleware = t.middleware(async ({ c, next }) => {
  const session = await auth();

  if (!session) {
    throw new HTTPException(401, { message: 'Unauthorized!' });
  }

  const user = await getUserById(session.user?.id || '');

  if (!user) {
    throw new HTTPException(401, { message: 'Unauthorized!' });
  }

  return next({ user });
});

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const baseProcedure = t.procedure;
export const publicProcedure = baseProcedure;
export const privateProcedure = publicProcedure.use(authMiddleware);
