'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/lib/types';
import { authService } from '@/lib/auth';

// ============================================================================
// CONTEXT TYPES
// ============================================================================

interface AuthContextType {
  // User state
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Authentication methods
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  
  // User management
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  
  // Role checking utilities
  isAdmin: () => boolean;
  isClient: () => boolean;
  hasRole: (role: 'admin' | 'client') => boolean;
}

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// AUTH PROVIDER COMPONENT
// ============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    // Initialize auth state from storage (client-side only)
    if (typeof window !== 'undefined') {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    }
    setIsLoading(false);

    // Subscribe to auth changes
    const unsubscribe = authService.subscribe((newUser) => {
      setUser(newUser);
    });

    return unsubscribe;
  }, []);

  // ============================================================================
  // AUTHENTICATION METHODS
  // ============================================================================

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return { success: result.success, error: result.error };
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    setIsLoading(true);
    try {
      const result = await authService.register(userData);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return { success: result.success, error: result.error };
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================================
  // USER MANAGEMENT
  // ============================================================================

  const updateProfile = async (updates: Partial<User>) => {
    try {
      const result = await authService.updateProfile(updates);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return { success: result.success, error: result.error };
    } catch (error) {
      return { success: false, error: 'Error al actualizar perfil' };
    }
  };

  // ============================================================================
  // ROLE CHECKING UTILITIES
  // ============================================================================

  const isAdmin = () => authService.isAdmin();
  const isClient = () => authService.isClient();
  const hasRole = (role: 'admin' | 'client') => authService.hasRole(role);
  const isAuthenticated = authService.isAuthenticated();

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const value: AuthContextType = {
    // User state
    user,
    isLoading,
    isAuthenticated,
    
    // Authentication methods
    login,
    logout,
    register,
    
    // User management
    updateProfile,
    
    // Role checking utilities
    isAdmin,
    isClient,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================================
// CUSTOM HOOK
// ============================================================================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

// Hook to require authentication
export function useRequireAuth() {
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login or show login modal
      window.location.href = '/login';
    }
  }, [user, isLoading]);
  
  return { user, isLoading };
}

// Hook to require specific role
export function useRequireRole(requiredRole: 'admin' | 'client') {
  const { user, isLoading, hasRole } = useAuth();
  
  useEffect(() => {
    if (!isLoading && (!user || !hasRole(requiredRole))) {
      // Redirect to unauthorized page or login
      window.location.href = user ? '/unauthorized' : '/login';
    }
  }, [user, isLoading, hasRole, requiredRole]);
  
  return { user, isLoading };
}

// Hook to require admin role
export function useRequireAdmin() {
  return useRequireRole('admin');
}

// Hook to require client role
export function useRequireClient() {
  return useRequireRole('client');
}


