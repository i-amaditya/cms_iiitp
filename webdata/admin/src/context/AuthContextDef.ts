import { createContext } from 'react';
import type { User } from '../api/types';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  isEditor: boolean;
  canAccessSection: (section: string) => boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
