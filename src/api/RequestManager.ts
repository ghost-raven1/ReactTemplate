import { api } from './axios';
import type { AxiosError } from 'axios';
import type { OrionResponse, OrionError, QueryParams, BatchResponse } from './types';
import config from '../config';

export class RequestManager {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.api.baseUrl;
  }

  private buildQueryString(params: QueryParams): string {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params.search) queryParams.append('search', params.search);
    
    if (params.sort?.length) {
      params.sort.forEach(sort => queryParams.append('sort[]', sort));
    }
    
    if (params.include?.length) {
      params.include.forEach(include => queryParams.append('include[]', include));
    }

    if (params.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(`filter[${key}][]`, v.toString()));
        } else {
          queryParams.append(`filter[${key}]`, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  private handleError(error: AxiosError<OrionError>): never {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'An error occurred');
    }
    throw error;
  }

  async get<T>(endpoint: string, params: QueryParams = {}): Promise<OrionResponse<T>> {
    try {
      const queryString = this.buildQueryString(params);
      const response = await api.get<OrionResponse<T>>(`${this.baseUrl}/${endpoint}${queryString}`);
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<OrionError>);
    }
  }

  async post<T>(endpoint: string, data: any): Promise<OrionResponse<T>> {
    try {
      const response = await api.post<OrionResponse<T>>(`${this.baseUrl}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<OrionError>);
    }
  }

  async put<T>(endpoint: string, data: any): Promise<OrionResponse<T>> {
    try {
      const response = await api.put<OrionResponse<T>>(`${this.baseUrl}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<OrionError>);
    }
  }

  async patch<T>(endpoint: string, data: any): Promise<OrionResponse<T>> {
    try {
      const response = await api.patch<OrionResponse<T>>(`${this.baseUrl}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<OrionError>);
    }
  }

  async delete(endpoint: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${endpoint}`);
    } catch (error) {
      return this.handleError(error as AxiosError<OrionError>);
    }
  }

  async batchStore<T>(endpoint: string, data: any[]): Promise<BatchResponse<T>> {
    try {
      const response = await api.post<BatchResponse<T>>(`${this.baseUrl}/${endpoint}/batch`, { data });
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<OrionError>);
    }
  }

  async batchUpdate<T>(endpoint: string, data: any[]): Promise<BatchResponse<T>> {
    try {
      const response = await api.patch<BatchResponse<T>>(`${this.baseUrl}/${endpoint}/batch`, { data });
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<OrionError>);
    }
  }

  async batchDelete(endpoint: string, ids: number[]): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${endpoint}/batch`, { data: { ids } });
    } catch (error) {
      return this.handleError(error as AxiosError<OrionError>);
    }
  }

  async search<T>(endpoint: string, params: QueryParams = {}): Promise<OrionResponse<T>> {
    try {
      const queryString = this.buildQueryString(params);
      const response = await api.post<OrionResponse<T>>(`${this.baseUrl}/${endpoint}/search${queryString}`);
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<OrionError>);
    }
  }

  async restore<T>(endpoint: string, id: number): Promise<OrionResponse<T>> {
    try {
      const response = await api.post<OrionResponse<T>>(`${this.baseUrl}/${endpoint}/${id}/restore`);
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<OrionError>);
    }
  }

  async batchRestore<T>(endpoint: string, ids: number[]): Promise<BatchResponse<T>> {
    try {
      const response = await api.post<BatchResponse<T>>(`${this.baseUrl}/${endpoint}/batch/restore`, { ids });
      return response.data;
    } catch (error) {
      return this.handleError(error as AxiosError<OrionError>);
    }
  }
} 