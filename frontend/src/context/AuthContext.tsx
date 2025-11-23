import React, { createContext, useContext, useState, useCallback } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  authHeader: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authHeader, setAuthHeader] = useState<string | null>(() => {
    const stored = localStorage.getItem('nb_auth');
    return stored || null;
  });

  const login = useCallback((username: string, password: string) => {
    const encoded = btoa(`${username}:${password}`);
    const header = `Basic ${encoded}`;
    localStorage.setItem('nb_auth', header);
    setAuthHeader(header);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('nb_auth');
    setAuthHeader(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!authHeader, authHeader, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
