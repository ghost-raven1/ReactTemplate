import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { LoggerState, Log, LogLevel } from '../shared/types/logger';

interface LoggerStore extends LoggerState {
  log: (
    level: LogLevel,
    message: string,
    data?: unknown,
    tags?: string[],
    category?: string
  ) => void;
  clear: () => void;
  setEnabled: (enabled: boolean) => void;
  setMaxLogs: (max: number) => void;
  setFilters: (filters: Partial<LoggerState['filters']>) => void;
}

const initialState: LoggerState = {
  logs: [],
  maxLogs: 100,
  isEnabled: true,
  filters: {
    levels: ['debug', 'info', 'warn', 'error'],
    categories: [],
    tags: [],
  },
};

export const useLoggerStore = create<LoggerStore>((set, get) => ({
  ...initialState,

  log: (level, message, data, tags, category) => {
    const { maxLogs } = get();
    const newLog: Log = {
      id: uuidv4(),
      level,
      message,
      timestamp: Date.now(),
      data,
      tags,
      category,
    };

    set((state) => ({
      logs: [newLog, ...state.logs].slice(0, maxLogs),
    }));

    // Console output with colors and grouping
    const colors = {
      debug: 'color: #6c757d; font-weight: bold;',
      info: 'color: #0dcaf0; font-weight: bold;',
      warn: 'color: #ffc107; font-weight: bold;',
      error: 'color: #dc3545; font-weight: bold;',
    };

    const groupTitle = `${category ? `[${category}] ` : ''}${message}`;
    
    console.group(`%c[${level.toUpperCase()}] ${groupTitle}`, colors[level]);
    
    if (data) {
      console.log('Data:', data);
    }
    
    if (tags && tags.length > 0) {
      console.log('Tags:', tags.join(', '));
    }
    
    console.log('Timestamp:', new Date(newLog.timestamp).toLocaleString());
    
    console.groupEnd();
  },

  clear: () => set({ logs: [] }),

  setEnabled: (enabled) => set({ isEnabled: enabled }),

  setMaxLogs: (max) => set({ maxLogs: max }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
})); 