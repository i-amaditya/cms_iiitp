import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/index.ts';
import { api, getStoredToken, setStoredToken, clearStoredToken } from '../utils/api.ts';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isFaculty: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      if (!getStoredToken()) {
        setUser(null);
        setLoading(false);
        return;
      }
      const data = await api.get<User>('/api/auth/me');
      setUser(data);
    } catch (err) {
      console.warn('Authentication token expired or invalid', err);
      clearStoredToken();
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await api.post<{ user: any; token: string }>('/api/auth/login', { username, password });
    setStoredToken(res.token);
    setToken(res.token);
    await fetchCurrentUser();
  };

  const logout = async () => {
    try {
      if (token) {
        await api.post('/api/auth/logout');
      }
    } catch (e) {
      // ignore network errors on logout
    } finally {
      clearStoredToken();
      setToken(null);
      setUser(null);
    }
  };

  const refreshUser = async () => {
    await fetchCurrentUser();
  };

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const isFaculty = user?.role === 'FACULTY';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAdmin,
        isSuperAdmin,
        isFaculty,
        login,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
