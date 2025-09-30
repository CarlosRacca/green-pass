import { User, UserRole } from './types';
import { apiPost } from './api';

// ============================================================================
// DEMO USERS - Replace with real API calls
// ============================================================================

const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'carlos@greenpass.com',
    name: 'Carlos Racca',
    role: 'admin',
    avatar: '/admin-avatar.png',
    phone: '+54 11 1234-5678',
    memberSince: '2020-01-15',
    preferences: {
      notifications: true,
      newsletter: true,
      language: 'es',
      timezone: 'America/Argentina/Buenos_Aires'
    }
  },
  {
    id: '2',
    email: 'juan@greenpass.com',
    name: 'Juan Pérez',
    role: 'client',
    avatar: '/client-avatar.png',
    phone: '+54 11 9876-5432',
    handicap: 18,
    memberSince: '2022-03-20',
    preferences: {
      notifications: true,
      newsletter: false,
      language: 'es',
      timezone: 'America/Argentina/Buenos_Aires'
    },
    stats: {
      totalTournaments: 12,
      totalTravels: 3,
      averageScore: 85,
      bestScore: 78,
      favoriteDestination: 'Pebble Beach'
    }
  }
];

// ============================================================================
// AUTH SERVICE
// ============================================================================

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  private constructor() {
    // Load user from localStorage on initialization (client-side only)
    if (typeof window !== 'undefined') {
      this.loadUserFromStorage();
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // ============================================================================
  // AUTHENTICATION METHODS
  // ============================================================================

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Real login contra backend
      const res = await apiPost<{ token: string; user: any }>('/auth/login', { email, password });
      // Guardar token en localStorage y cookie para middleware
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('token', res.token); } catch {}
        try { document.cookie = `gp_auth=1; path=/`; } catch {}
      }
      // Adaptar user del backend a tipo User del admin
      const mapped: User = {
        id: String(res.user.id),
        email: res.user.email,
        name: [res.user.nombre, res.user.apellido].filter(Boolean).join(' ') || res.user.email,
        role: (res.user.role === 'superadmin' || res.user.role === 'admin') ? 'admin' : 'client',
        phone: res.user.telefono || undefined,
        handicap: typeof res.user.handicap === 'number' ? res.user.handicap : undefined,
        memberSince: new Date().toISOString(),
        preferences: { notifications: true, newsletter: true, language: 'es' },
      };
      this.currentUser = mapped;
      this.saveUserToStorage(mapped);
      this.notifyListeners();
      return { success: true, user: mapped };
    } catch (error: any) {
      const msg = (error && error.message) ? error.message : 'Error de conexión';
      return { success: false, error: msg };
    }
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.removeUserFromStorage();
    try { if (typeof window !== 'undefined') localStorage.removeItem('token'); } catch {}
    try { if (typeof window !== 'undefined') document.cookie = 'gp_auth=; Max-Age=0; path=/'; } catch {}
    this.notifyListeners();
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: UserRole;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Demo registration - replace with real API call
      const existingUser = DEMO_USERS.find(u => u.email === userData.email);
      
      if (existingUser) {
        return { success: false, error: 'El email ya está registrado' };
      }

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role || 'client',
        phone: userData.phone,
        memberSince: new Date().toISOString(),
        preferences: {
          notifications: true,
          newsletter: true,
          language: 'es',
          timezone: 'America/Argentina/Buenos_Aires'
        }
      };

      // In real implementation, save to database
      DEMO_USERS.push(newUser);
      
      this.currentUser = newUser;
      this.saveUserToStorage(newUser);
      this.notifyListeners();

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: 'Error al crear la cuenta' };
    }
  }

  // ============================================================================
  // USER MANAGEMENT
  // ============================================================================

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser?.role === role;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isClient(): boolean {
    return this.hasRole('client');
  }

  async updateProfile(updates: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    if (!this.currentUser) {
      return { success: false, error: 'No hay usuario autenticado' };
    }

    try {
      const updatedUser = { ...this.currentUser, ...updates };
      this.currentUser = updatedUser;
      this.saveUserToStorage(updatedUser);
      this.notifyListeners();

      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: 'Error al actualizar perfil' };
    }
  }

  // ============================================================================
  // STORAGE MANAGEMENT
  // ============================================================================

  private saveUserToStorage(user: User): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('greenpass_user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }

  private loadUserFromStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('greenpass_user');
        if (stored) {
          this.currentUser = JSON.parse(stored);
        }
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      this.removeUserFromStorage();
    }
  }

  private removeUserFromStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('greenpass_user');
      }
    } catch (error) {
      console.error('Error removing user from storage:', error);
    }
  }

  // ============================================================================
  // LISTENER MANAGEMENT
  // ============================================================================

  subscribe(listener: (user: User | null) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentUser));
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const authService = AuthService.getInstance();

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export const requireAuth = (user: User | null): user is User => {
  return user !== null;
};

export const requireRole = (user: User | null, role: UserRole): boolean => {
  return user?.role === role;
};

export const requireAdmin = (user: User | null): boolean => {
  return requireRole(user, 'admin');
};

export const requireClient = (user: User | null): boolean => {
  return requireRole(user, 'client');
};


