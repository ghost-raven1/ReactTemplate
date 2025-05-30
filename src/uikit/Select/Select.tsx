import React from 'react';
import styled from 'styled-components';
import { Select as AntSelect } from 'antd';
import type { SelectProps as AntSelectProps } from 'antd';

export interface SelectProps extends AntSelectProps {
  fullWidth?: boolean;
  error?: boolean;
}

const StyledSelect = styled(AntSelect)<SelectProps>`
  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}

  ${({ error, theme }) =>
    error &&
    `
    .ant-select-selector {
      border-color: ${theme.colors.error} !important;
    }
    &:hover .ant-select-selector {
      border-color: ${theme.colors.error} !important;
    }
    &.ant-select-focused .ant-select-selector {
      border-color: ${theme.colors.error} !important;
      box-shadow: 0 0 0 2px ${theme.colors.error}33 !important;
    }
  `}
`;

export const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return <StyledSelect {...props}>{children}</StyledSelect>;
}; 