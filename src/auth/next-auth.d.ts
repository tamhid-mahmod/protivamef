import type { UserRole } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports
import { JWT } from 'next-auth/jwt';
import { type DefaultSession } from 'next-auth';

// ----------------------------------------------------------------------

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
};

declare module 'next-auth' {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendedUser;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role?: UserRole;
  }
}
