import React from 'react';
import styled from 'styled-components';

const Card = styled.li`
  background: rgba(255, 255, 255, 0.05);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
`;

interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <Card>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
}; 