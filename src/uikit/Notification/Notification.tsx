import React from 'react';
import styled from 'styled-components';
import { notification as antNotification } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationInstance = {
  success: (config: NotificationArgsProps) => void;
  error: (config: NotificationArgsProps) => void;
  info: (config: NotificationArgsProps) => void;
  warning: (config: NotificationArgsProps) => void;
  open: (config: NotificationArgsProps) => void;
};

export interface NotificationProps extends Omit<NotificationArgsProps, 'message'> {
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  showIcon?: boolean;
  message: React.ReactNode;
  description?: React.ReactNode;
}

const StyledNotification = styled.div<{ type?: string }>`
  .ant-notification-notice {
    border-radius: ${({ theme }) => theme.borderRadius.md};
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08);
  }

  ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return `
          .ant-notification-notice {
            border-left: 4px solid ${theme.colors.success};
          }
        `;
      case 'warning':
        return `
          .ant-notification-notice {
            border-left: 4px solid ${theme.colors.warning};
          }
        `;
      case 'error':
        return `
          .ant-notification-notice {
            border-left: 4px solid ${theme.colors.error};
          }
        `;
      case 'info':
        return `
          .ant-notification-notice {
            border-left: 4px solid ${theme.colors.primary};
          }
        `;
      default:
        return '';
    }
  }}
`;

class Notification {
  private static instance: NotificationInstance;

  static init() {
    const [api, contextHolder] = antNotification.useNotification();
    Notification.instance = api;
    return contextHolder;
  }

  static show({
    type = 'info',
    duration = 4.5,
    placement = 'topRight',
    showIcon = true,
    ...props
  }: NotificationProps) {
    if (!Notification.instance) {
      console.warn('Notification system not initialized. Call Notification.init() first.');
      return;
    }

    const method = type as keyof NotificationInstance;
    Notification.instance[method]({
      duration,
      placement,
      icon: showIcon ? undefined : null,
      ...props,
    });
  }

  static success(props: NotificationProps) {
    Notification.show({ ...props, type: 'success' });
  }

  static error(props: NotificationProps) {
    Notification.show({ ...props, type: 'error' });
  }

  static warning(props: NotificationProps) {
    Notification.show({ ...props, type: 'warning' });
  }

  static info(props: NotificationProps) {
    Notification.show({ ...props, type: 'info' });
  }
}

export { Notification }; 