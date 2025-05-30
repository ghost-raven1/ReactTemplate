/*
 * Copyright (c) 2025 Aleksej Starodubcev (tg: @ghost_raven1). All rights reserved.
 */
import React from 'react';
import { notification } from 'antd';
import type { NotificationInstance } from 'antd/es/notification/interface';

interface NotificationContextType {
  api: NotificationInstance;
}

export const NotificationContext = React.createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <NotificationContext.Provider value={{ api }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
