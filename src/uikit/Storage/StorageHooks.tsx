import { useState, useEffect, useCallback } from 'react';

// Хук для работы с localStorage
export const useLocalStorage = (key: string, initialValue: any) => {
  // Получение начального значения
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Обновление значения в localStorage при изменении состояния
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  // Функция для обновления значения
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error('Error setting localStorage value:', error);
    }
  }, [storedValue]);

  // Функция для удаления значения
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
};

// Хук для работы с sessionStorage
export const useSessionStorage = (key: string, initialValue: T) => {
  // Получение начального значения
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return initialValue;
    }
  });

  // Обновление значения в sessionStorage при изменении состояния
  useEffect(() => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to sessionStorage:', error);
    }
  }, [key, storedValue]);

  // Функция для обновления значения
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error('Error setting sessionStorage value:', error);
    }
  }, [storedValue]);

  // Функция для удаления значения
  const removeValue = useCallback(() => {
    try {
      window.sessionStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
};
