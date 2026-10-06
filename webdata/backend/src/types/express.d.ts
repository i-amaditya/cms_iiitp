import { UserRole } from '@prisma/client';

export interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
  tokenVersion: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
