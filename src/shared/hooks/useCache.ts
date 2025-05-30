import { useState, useCallback } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
}

export function useCache<T>(options: CacheOptions = {}) {
  const [cache] = useState<Map<string, CacheItem<T>>>(new Map());
  const { ttl = 5 * 60 * 1000 } = options; // Default TTL: 5 minutes

  const get = useCallback(
    (key: string): T | null => {
      const item = cache.get(key);
      if (!item) return null;

      const now = Date.now();
      if (now - item.timestamp > ttl) {
        cache.delete(key);
        return null;
      }

      return item.data;
    },
    [cache, ttl]
  );

  const set = useCallback(
    (key: string, data: T): void => {
      cache.set(key, {
        data,
        timestamp: Date.now(),
      });
    },
    [cache]
  );

  const remove = useCallback(
    (key: string): void => {
      cache.delete(key);
    },
    [cache]
  );

  const clear = useCallback((): void => {
    cache.clear();
  }, [cache]);

  return { get, set, remove, clear };
} 