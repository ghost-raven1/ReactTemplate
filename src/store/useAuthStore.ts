import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      setAuth: (user: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ isAuthenticated: true, user, token });
      },
      clearAuth: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ isAuthenticated: false, user: null, token: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
); 