import React from 'react';
import styled from 'styled-components';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const CardWrapper = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  padding: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    background: rgba(0, 0, 0, 0.5);
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #ffffff;
  font-weight: 500;
`;

export const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <CardWrapper className={className}>
      {title && <CardTitle>{title}</CardTitle>}
      {children}
    </CardWrapper>
  );
}; 