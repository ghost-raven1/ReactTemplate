import React from 'react';
import styled from 'styled-components';
import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps } from 'antd';

export interface InputProps extends AntInputProps {
  fullWidth?: boolean;
  error?: boolean;
}

const StyledInput = styled(AntInput)<InputProps>`
  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}

  ${({ error, theme }) =>
    error &&
    `
    border-color: ${theme.colors.error};
    &:hover,
    &:focus {
      border-color: ${theme.colors.error};
      box-shadow: 0 0 0 2px ${theme.colors.error}33;
    }
  `}
`;

export const Input: React.FC<InputProps> = ({ children, ...props }) => {
  return <StyledInput {...props}>{children}</StyledInput>;
}; 