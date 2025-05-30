import React from 'react';
import styled from 'styled-components';
import { Typography } from '../Typography/Typography';

export type LogLevel = 'info' | 'warning' | 'error' | 'debug';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: any;
}

export interface LoggerProps {
  maxEntries?: number;
  showTimestamp?: boolean;
  showLevel?: boolean;
  autoScroll?: boolean;
}

const LoggerContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  height: 300px;
  overflow-y: auto;
`;

const LogEntry = styled.div<{ level: LogLevel }>`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ level, theme }) => {
    switch (level) {
      case 'error':
        return theme.colors.error + '10';
      case 'warning':
        return theme.colors.warning + '10';
      case 'debug':
        return theme.colors.primary + '10';
      default:
        return 'transparent';
    }
  }};
  border-left: 4px solid ${({ level, theme }) => {
    switch (level) {
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'debug':
        return theme.colors.primary;
      default:
        return theme.colors.border;
    }
  }};
`;

const Timestamp = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const Level = styled.span<{ level: LogLevel }>`
  color: ${({ level, theme }) => {
    switch (level) {
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'debug':
        return theme.colors.primary;
      default:
        return theme.colors.text;
    }
  }};
  font-weight: bold;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxEntries: number;
  private listeners: ((logs: LogEntry[]) => void)[] = [];

  private constructor(maxEntries: number = 100) {
    this.maxEntries = maxEntries;
  }

  static getInstance(maxEntries?: number): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(maxEntries);
    }
    return Logger.instance;
  }

  private addLog(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      data,
    };

    this.logs.unshift(entry);
    if (this.logs.length > this.maxEntries) {
      this.logs.pop();
    }

    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener([...this.logs]));
  }

  subscribe(listener: (logs: LogEntry[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  info(message: string, data?: any) {
    this.addLog('info', message, data);
  }

  warning(message: string, data?: any) {
    this.addLog('warning', message, data);
  }

  error(message: string, data?: any) {
    this.addLog('error', message, data);
  }

  debug(message: string, data?: any) {
    this.addLog('debug', message, data);
  }

  clear() {
    this.logs = [];
    this.notifyListeners();
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }
}

export const LoggerView: React.FC<LoggerProps> = ({
  maxEntries = 100,
  showTimestamp = true,
  showLevel = true,
  autoScroll = true,
}) => {
  const [logs, setLogs] = React.useState<LogEntry[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const logger = Logger.getInstance(maxEntries);
    const unsubscribe = logger.subscribe(newLogs => {
      setLogs(newLogs);
      if (autoScroll && containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    });

    return () => unsubscribe();
  }, [maxEntries, autoScroll]);

  return (
    <LoggerContainer ref={containerRef}>
      {logs.map((log, index) => (
        <LogEntry key={index} level={log.level}>
          {showTimestamp && (
            <Timestamp>
              {log.timestamp.toLocaleTimeString()}
            </Timestamp>
          )}
          {showLevel && (
            <Level level={log.level}>
              {log.level.toUpperCase()}
            </Level>
          )}
          <Typography.Text>{log.message}</Typography.Text>
          {log.data && (
            <pre style={{ marginTop: '8px', fontSize: '12px' }}>
              {JSON.stringify(log.data, null, 2)}
            </pre>
          )}
        </LogEntry>
      ))}
    </LoggerContainer>
  );
}; 