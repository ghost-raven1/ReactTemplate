import { useCallback } from 'react';
import { useLoggerStore } from '../../store/loggerStore';
import type { LogLevel } from '../types/logger';

export const useLogger = (category?: string) => {
  const { log: storeLog, isEnabled } = useLoggerStore();

  const log = useCallback(
    (level: LogLevel, message: string, data?: unknown, tags?: string[]) => {
      if (!isEnabled) return;
      storeLog(level, message, data, tags, category);
    },
    [storeLog, isEnabled, category]
  );

  const debug = useCallback(
    (message: string, data?: unknown, tags?: string[]) => {
      log('debug', message, data, tags);
    },
    [log]
  );

  const info = useCallback(
    (message: string, data?: unknown, tags?: string[]) => {
      log('info', message, data, tags);
    },
    [log]
  );

  const warn = useCallback(
    (message: string, data?: unknown, tags?: string[]) => {
      log('warn', message, data, tags);
    },
    [log]
  );

  const error = useCallback(
    (message: string, data?: unknown, tags?: string[]) => {
      log('error', message, data, tags);
    },
    [log]
  );

  return {
    debug,
    info,
    warn,
    error,
    isEnabled,
  };
}; 