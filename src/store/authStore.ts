import { create } from 'zustand';
import { api } from '../api/axios';

interface AuthState {
  isAuthenticated: boolean;
  user: never | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,

  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, refreshToken, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      set({ isAuthenticated: true, user });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    set({ isAuthenticated: false, user: null });
  },

  refreshTokens: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh', { refreshToken });
      const { token, refreshToken: newRefreshToken } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', newRefreshToken);
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  },
}));
