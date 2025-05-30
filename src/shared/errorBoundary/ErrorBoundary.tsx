import React, { Component, type ErrorInfo } from 'react';
import { Typography, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import type {IErrorFallback, IProps, IState} from "./interfaces.ts";

export class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): IState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<IErrorFallback> = ({ error }) => {
  const { t } = useTranslation();

  return (
    <ErrorBoundaryStyled>
      <Typography.Title level={1}>Oops!</Typography.Title>
      <Typography.Title level={2}>
        {t('errors.somethingWentWrong')}
      </Typography.Title>
      <Typography.Paragraph>
        {error?.message || t('errors.unknownError')}
      </Typography.Paragraph>
      <Button
        type="primary"
        onClick={() => window.location.reload()}
      >
        {t('errors.reloadPage')}
      </Button>
    </ErrorBoundaryStyled>
  );
};

const ErrorBoundaryStyled = styled.div`
    height: 100%;
    max-height: 100vh;
    width: 100%;
    max-width: 100vw;
`;
