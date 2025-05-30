import { RequestManager } from './RequestManager';
import type { QueryParams, OrionResponse, BatchResponse } from './types';

export abstract class BaseModel<T> {
  protected requestManager: RequestManager;
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.requestManager = new RequestManager();
  }

  async getAll(params: QueryParams = {}): Promise<OrionResponse<T[]>> {
    return this.requestManager.get<T[]>(this.endpoint, params);
  }

  async getById(id: number, params: QueryParams = {}): Promise<OrionResponse<T>> {
    return this.requestManager.get<T>(`${this.endpoint}/${id}`, params);
  }

  async create(data: Partial<T>): Promise<OrionResponse<T>> {
    return this.requestManager.post<T>(this.endpoint, data);
  }

  async update(id: number, data: Partial<T>): Promise<OrionResponse<T>> {
    return this.requestManager.patch<T>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    return this.requestManager.delete(`${this.endpoint}/${id}`);
  }

  async search(params: QueryParams = {}): Promise<OrionResponse<T[]>> {
    return this.requestManager.search<T[]>(this.endpoint, params);
  }

  async batchCreate(data: Partial<T>[]): Promise<BatchResponse<T>> {
    return this.requestManager.batchStore<T>(this.endpoint, data);
  }

  async batchUpdate(data: Partial<T>[]): Promise<BatchResponse<T>> {
    return this.requestManager.batchUpdate<T>(this.endpoint, data);
  }

  async batchDelete(ids: number[]): Promise<void> {
    return this.requestManager.batchDelete(this.endpoint, ids);
  }

  async restore(id: number): Promise<OrionResponse<T>> {
    return this.requestManager.restore<T>(this.endpoint, id);
  }

  async batchRestore(ids: number[]): Promise<BatchResponse<T>> {
    return this.requestManager.batchRestore<T>(this.endpoint, ids);
  }
} 