import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../api/axios';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,

      setAuth: (user: User, token: string) => {
        set({ isAuthenticated: true, user, token });
      },

      clearAuth: () => {
        set({ isAuthenticated: false, user: null, token: null });
      },

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          
          // Имитация задержки запроса
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Имитация успешного входа
          const mockUser = {
            id: '1',
            email: email,
            name: 'Тестовый Пользователь'
          };
          
          const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(7);
          
          set({ 
            isAuthenticated: true, 
            user: mockUser, 
            token: mockToken, 
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          set({ isAuthenticated: false, user: null, token: null, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
); 