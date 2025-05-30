import type { AuthResponse, ApiError, RefreshTokenResponse } from '../../types';
import { api } from '../../api/axios';

export interface IAuthService {
  login(email: string, password: string): Promise<AuthResponse>;
  register(name: string, email: string, password: string): Promise<AuthResponse>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<RefreshTokenResponse>;
}

export class AuthService implements IAuthService {
  private readonly API_URL = '/api/auth';

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(`${this.API_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Failed to login');
    }
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(`${this.API_URL}/register`, {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Failed to register');
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post(`${this.API_URL}/logout`);
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Failed to logout');
    }
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await api.post<RefreshTokenResponse>(`${this.API_URL}/refresh`, {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Failed to refresh token');
    }
  }
}
