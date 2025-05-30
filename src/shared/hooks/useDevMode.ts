/*
 * Copyright (c) 2025 Aleksej Starodubcev (tg: @ghost_raven1). All rights reserved.
 */
import { useState, useCallback } from 'react';

export const useDevMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDevModeEnabled, setIsDevModeEnabled] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const toggleDevMode = useCallback(() => {
    setIsDevModeEnabled(prev => !prev);
  }, []);

  return {
    isOpen,
    isDevModeEnabled,
    open,
    close,
    toggle,
    toggleDevMode
  };
}; 