/*
 * Copyright (c) 2025 Aleksej Starodubcev (tg: @ghost_raven1). All rights reserved.
 */
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/config';
import { useNotification } from '../components/Notification';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

const AUTH_STORAGE_KEY = 'auth_state';

const getInitialState = (): AuthState => {
  const savedState = localStorage.getItem(AUTH_STORAGE_KEY);
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (e) {
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    }
  }
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  };
};

export const useAuth = () => {
  const navigate = useNavigate();
  const { api: notification } = useNotification();
  const [authState, setAuthState] = useState<AuthState>(getInitialState);

  // Сохраняем состояние только при изменении isAuthenticated
  useEffect(() => {
    if (authState.isAuthenticated) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [authState.isAuthenticated]);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      // Проверяем, не авторизован ли уже пользователь
      if (authState.isAuthenticated) {
        return { success: true };
      }

      // Устанавливаем состояние загрузки
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // TODO: Implement actual login logic here
      const mockUser: User = {
        id: '1',
        email,
        name: 'Test User',
      };

      // Обновляем состояние
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });

      // Навигация после успешного обновления состояния
      navigate(ROUTES.HOME);

      return { success: true };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      notification.error({
        message: 'Failed to login',
        key: 'login-error-notification',
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to login'
      };
    }
  }, [navigate, notification, authState.isAuthenticated]);

  const logout = useCallback(async (): Promise<AuthResult> => {
    try {
      // Проверяем, авторизован ли пользователь
      if (!authState.isAuthenticated) {
        return { success: true };
      }

      // Устанавливаем состояние загрузки
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // TODO: Implement actual logout logic here

      // Обновляем состояние одним вызовом
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });

      // Навигация после успешного обновления состояния
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 0);

      return { success: true };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      notification.error({
        message: 'Failed to logout',
        key: 'logout-error-notification',
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to logout'
      };
    }
  }, [navigate, notification, authState.isAuthenticated]);

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
  };
};
