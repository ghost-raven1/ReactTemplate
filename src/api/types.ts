export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface OrionResponse<T> {
  data: T;
  meta?: {
    pagination?: PaginationMeta;
  };
}

export interface OrionError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface QueryParams {
  page?: number;
  per_page?: number;
  sort?: string[];
  filter?: Record<string, any>;
  search?: string;
  include?: string[];
}

export interface BatchResponse<T> {
  data: T[];
  meta?: {
    pagination?: PaginationMeta;
  };
} 