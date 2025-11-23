import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback } from 'react';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [authHeader, setAuthHeader] = useState(() => {
        const stored = localStorage.getItem('nb_auth');
        return stored || null;
    });
    const login = useCallback((username, password) => {
        const encoded = btoa(`${username}:${password}`);
        const header = `Basic ${encoded}`;
        localStorage.setItem('nb_auth', header);
        setAuthHeader(header);
    }, []);
    const logout = useCallback(() => {
        localStorage.removeItem('nb_auth');
        setAuthHeader(null);
    }, []);
    return (_jsx(AuthContext.Provider, { value: { isAuthenticated: !!authHeader, authHeader, login, logout }, children: children }));
};
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
