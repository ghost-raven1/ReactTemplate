/*
 * Copyright (c) 2025 Aleksej Starodubcev (tg: @ghost_raven1). All rights reserved.
 */
import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Button, Result } from 'antd';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Result
      status="error"
      title="Что-то пошло не так"
      subTitle={error.message}
      extra={[
        <Button type="primary" key="reload" onClick={() => window.location.reload()}>
          Перезагрузить страницу
        </Button>,
        <Button key="reset" onClick={resetErrorBoundary}>
          Попробовать снова
        </Button>
      ]}
    />
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}; 