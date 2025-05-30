import React from 'react';
import styled, { css } from 'styled-components';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';

export interface ButtonProps extends Omit<AntButtonProps, 'type'> {
  variant?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  size?: 'small' | 'middle' | 'large';
  fullWidth?: boolean;
}

const StyledButton = styled(AntButton)<ButtonProps>`
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.secondary};
          border-color: ${theme.colors.secondary};
          &:hover {
            background-color: ${theme.colors.secondary}dd;
            border-color: ${theme.colors.secondary}dd;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          border-color: ${theme.colors.primary};
          color: ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primary}11;
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          border-color: transparent;
          color: ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primary}11;
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primary}dd;
            border-color: ${theme.colors.primary}dd;
          }
        `;
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          height: 24px;
          padding: 0 12px;
          font-size: 12px;
        `;
      case 'large':
        return css`
          height: 40px;
          padding: 0 24px;
          font-size: 16px;
        `;
      default:
        return css`
          height: 32px;
          padding: 0 16px;
          font-size: 14px;
        `;
    }
  }}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

export const Button: React.FC<ButtonProps> = ({ variant = 'default', ...props }) => {
  return <StyledButton type={variant} {...props} />;
}; 