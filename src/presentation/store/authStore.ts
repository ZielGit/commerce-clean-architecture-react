import { create } from 'zustand';
import { User } from '../../domain/entities/User';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Actions
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (token, user) =>
    set({
      token,
      user,
      isAuthenticated: true,
    }),

  clearAuth: () =>
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    }),

  setUser: (user) =>
    set({ user }),
}));
