import { useEffect, useRef, useCallback, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Centrifuge, Subscription } from '@centrifuge/centrifuge-js';
import { useAuthStore } from '../../store/auth';

interface UseCentrifugeOptions {
  url: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

interface UseCentrifugeResult {
  isConnected: boolean;
  subscribe: (channel: string, callback: (data: any) => void) => () => void;
  publish: (channel: string, data: any) => Promise<void>;
  disconnect: () => void;
}

export const useCentrifuge = ({
  url,
  onConnect,
  onDisconnect,
  onError,
}: UseCentrifugeOptions): UseCentrifugeResult => {
  const [isConnected, setIsConnected] = useState(false);
  const centrifugeRef = useRef<Centrifuge | null>(null);
  const subscriptionsRef = useRef<Map<string, Subscription>>(new Map());
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!url) return;

    const centrifuge = new Centrifuge(url, {
      token: accessToken,
      debug: process.env.NODE_ENV === 'development',
    });

    centrifuge.on('connect', () => {
      setIsConnected(true);
      onConnect?.();
    });

    centrifuge.on('disconnect', () => {
      setIsConnected(false);
      onDisconnect?.();
    });

    centrifuge.on('error', (error) => {
      onError?.(error);
    });

    centrifuge.connect();
    centrifugeRef.current = centrifuge;

    return () => {
      centrifuge.disconnect();
      centrifugeRef.current = null;
    };
  }, [url, accessToken, onConnect, onDisconnect, onError]);

  const subscribe = useCallback((channel: string, callback: (data: any) => void) => {
    if (!centrifugeRef.current) {
      throw new Error('Centrifuge is not connected');
    }

    const subscription = centrifugeRef.current.subscribe(channel, (ctx) => {
      callback(ctx.data);
    });

    subscriptionsRef.current.set(channel, subscription);

    return () => {
      subscription.unsubscribe();
      subscriptionsRef.current.delete(channel);
    };
  }, []);

  const publish = useCallback(async (channel: string, data: any) => {
    if (!centrifugeRef.current) {
      throw new Error('Centrifuge is not connected');
    }

    await centrifugeRef.current.publish(channel, data);
  }, []);

  const disconnect = useCallback(() => {
    if (centrifugeRef.current) {
      centrifugeRef.current.disconnect();
    }
  }, []);

  return {
    isConnected,
    subscribe,
    publish,
    disconnect,
  };
};
