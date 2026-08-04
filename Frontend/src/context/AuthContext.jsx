import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api, { attachToken } from '../services/api';

const AuthContext = createContext(null);
const STORAGE_KEY = 'bookstore-auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.token) {
          setUser(parsed.user);
          setToken(parsed.token);
          attachToken(parsed.token);
        }
      } catch (error) {
        console.error('Failed to read auth storage', error);
      }
    }
  }, []);

  useEffect(() => {
    attachToken(token);
  }, [token]);

  const saveAuth = ({ token: newToken, user: newUser }) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: newToken, user: newUser }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
    attachToken(null);
  };

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(token), saveAuth, logout }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};

export const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
