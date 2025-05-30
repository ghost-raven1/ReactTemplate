import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/user';
import { AuthService } from '../shared/services/auth.service';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
}

const authService = new AuthService();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      expiresIn: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        const response = await authService.login(email, password);
        set({
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          expiresIn: response.expiresIn,
          isAuthenticated: true,
        });
      },
      register: async (name: string, email: string, password: string) => {
        const response = await authService.register(name, email, password);
        set({
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          expiresIn: response.expiresIn,
          isAuthenticated: true,
        });
      },
      logout: async () => {
        await authService.logout();
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          expiresIn: null,
          isAuthenticated: false,
        });
      },
      refreshTokens: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        const response = await authService.refreshToken(refreshToken);
        set({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          expiresIn: response.expiresIn,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
); 