import React from 'react';
import styled from 'styled-components';

const Grid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

interface FeaturesGridProps {
  children: React.ReactNode;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ children }) => {
  return <Grid>{children}</Grid>;
}; 