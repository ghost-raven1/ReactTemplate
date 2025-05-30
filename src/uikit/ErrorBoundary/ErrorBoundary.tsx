import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 20px;
  margin: 20px;
  border: 1px solid #dc3545;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ErrorTitle = styled.h2`
  color: #dc3545;
  margin: 0 0 16px 0;
  font-size: 20px;
`;

const ErrorMessage = styled.pre`
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 14px;
  margin: 0 0 16px 0;
`;

const ErrorStack = styled.pre`
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 12px;
  color: #6c757d;
  margin: 0;
`;

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    console.error('Error caught by ErrorBoundary', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          {this.state.error && (
            <ErrorMessage>{this.state.error.message}</ErrorMessage>
          )}
          {this.state.errorInfo && (
            <ErrorStack>{this.state.errorInfo.componentStack}</ErrorStack>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to use hooks
export const ErrorBoundary: React.FC<Props> = (props) => {
  return <ErrorBoundaryClass {...props} />;
};
