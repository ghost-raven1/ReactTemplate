export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Log {
  id: string;
  level: LogLevel;
  message: string;
  timestamp: number;
  category?: string;
  data?: unknown;
  tags?: string[];
}

export interface LoggerFilters {
  levels: LogLevel[];
  categories?: string[];
  tags?: string[];
}

export interface LoggerState {
  logs: Log[];
  maxLogs: number;
  isEnabled: boolean;
  filters: LoggerFilters;
} 