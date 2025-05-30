import React from 'react';
import styled from 'styled-components';
import { Card as AntCard } from 'antd';
import type { CardProps as AntCardProps } from 'antd';

export interface CardProps extends AntCardProps {
  fullWidth?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
}

const StyledCard = styled(AntCard)<CardProps>`
  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
  `}

  ${({ hoverable }) =>
    hoverable &&
    `
    transition: all 0.3s;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  `}

  ${({ bordered, theme }) =>
    !bordered &&
    `
    border: none;
    box-shadow: 0 1px 2px ${theme.colors.border};
  `}
`;

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
}; 