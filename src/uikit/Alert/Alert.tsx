import React from 'react';
import styled from 'styled-components';
import { Alert as AntAlert } from 'antd';
import type { AlertProps as AntAlertProps } from 'antd';

export interface AlertProps extends AntAlertProps {
  fullWidth?: boolean;
  closable?: boolean;
}

const StyledAlert = styled(AntAlert)<AlertProps>`
  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}

  &.ant-alert {
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  &.ant-alert-success {
    background-color: ${({ theme }) => theme.colors.success}11;
    border-color: ${({ theme }) => theme.colors.success};
  }

  &.ant-alert-info {
    background-color: ${({ theme }) => theme.colors.info}11;
    border-color: ${({ theme }) => theme.colors.info};
  }

  &.ant-alert-warning {
    background-color: ${({ theme }) => theme.colors.warning}11;
    border-color: ${({ theme }) => theme.colors.warning};
  }

  &.ant-alert-error {
    background-color: ${({ theme }) => theme.colors.error}11;
    border-color: ${({ theme }) => theme.colors.error};
  }
`;

export const Alert: React.FC<AlertProps> = ({ children, ...props }) => {
  return <StyledAlert {...props}>{children}</StyledAlert>;
}; 