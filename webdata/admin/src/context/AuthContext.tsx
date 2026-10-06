import React, { useEffect, useState, useCallback } from 'react';
import { getMe, logout as apiLogout } from '../api/auth';
import type { User } from '../api/types';
import { AuthContext } from './AuthContextDef';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentUser = useCallback(async () => {
    try {
      setError(null);
      const res = await getMe();
      setUser(res.user);
    } catch (err: unknown) {
      setUser(null);
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes('401') && !msg.includes('Authentication required')) {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    getMe()
      .then((res) => {
        if (isMounted) setUser(res.user);
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setUser(null);
          const msg = err instanceof Error ? err.message : String(err);
          if (!msg.includes('401') && !msg.includes('Authentication required')) {
            setError(msg);
          }
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const isAdmin = user?.role === 'admin';
  const isEditor = user?.role === 'editor';

  const canAccessSection = useCallback(
    (section: string): boolean => {
      if (!user) {
        return true;
      }
      if (isAdmin) return true;
      if (isEditor && user.sections) {
        return user.sections.includes(section.toLowerCase());
      }
      return false;
    },
    [user, isAdmin, isEditor]
  );

  const logout = async () => {
    try {
      await apiLogout();
    } catch (err: unknown) {
      console.warn('Logout error:', err);
    } finally {
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAdmin,
        isEditor,
        canAccessSection,
        refreshUser: fetchCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
