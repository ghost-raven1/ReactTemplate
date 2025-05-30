import React from 'react';
import styled from 'styled-components';

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
  text-align: center;
`;

interface PageDescriptionProps {
  children: React.ReactNode;
}

export const PageDescription: React.FC<PageDescriptionProps> = ({ children }) => {
  return <Description>{children}</Description>;
}; 