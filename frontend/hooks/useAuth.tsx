
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, UserProfile, RegistrationData } from '../types';
import { apiService } from '../services/apiService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true); // Initially true to check for persisted session
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to load user from local storage or make an API call to check session
    const attemptAutoLogin = async () => {
      setLoading(true);
      try {
        const user = await apiService.getCurrentUser(); // This would be a real API call
        setCurrentUser(user);
      } catch (e) {
        // No persisted session or error fetching
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    attemptAutoLogin();
  }, []);

  const login = async (credentials: { email: string; pass: string }) => {
    setLoading(true);
    setError(null);
    try {
      const user = await apiService.login(credentials.email, credentials.pass);
      setCurrentUser(user);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de la connexion.');
      setLoading(false);
      throw err;
    }
  };

  const register = async (userData: RegistrationData) => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, API returns the new user or a success message.
      // For mock, we assume registration is "pending" and don't log them in.
      await apiService.register(userData); 
      // setCurrentUser(newUser); // Or not, if admin validation is required first
      setLoading(false);
      // The success message specific to registration is handled in AuthForm
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de l\'inscription.');
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await apiService.logout(); // Inform backend
      setCurrentUser(null);
      setLoading(false);
    } catch (err) {
       setError(err instanceof Error ? err.message : 'Échec de la déconnexion.');
       setLoading(false);
       throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
