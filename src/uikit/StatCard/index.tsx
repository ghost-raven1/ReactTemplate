import React from 'react';
import styled from 'styled-components';
import { Card } from '../Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  margin: 8px 0;
`;

const StatIcon = styled.div`
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 12px;
  opacity: 0.9;
`;

const TrendIndicator = styled.div<{ isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.isPositive ? '#52c41a' : '#ff4d4f'};
  font-size: 14px;
  font-weight: 600;
`;

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className
}) => {
  return (
    <Card title={title} className={className}>
      {icon && <StatIcon>{icon}</StatIcon>}
      <StatValue>{value}</StatValue>
      {trend && (
        <TrendIndicator isPositive={trend.isPositive}>
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
        </TrendIndicator>
      )}
    </Card>
  );
}; 