import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
  text-align: center;
`;

interface PageTitleProps {
  children: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return <Title>{children}</Title>;
}; 