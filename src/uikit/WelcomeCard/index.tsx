import React from 'react';
import styled from 'styled-components';
import { Card } from '../Card';

const WelcomeTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
  text-align: center;
`;

const WelcomeText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
  text-align: center;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

const FeatureItem = styled.li`
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

const FeatureTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 12px;
`;

const FeatureDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
`;

interface WelcomeCardProps {
  title?: string;
  description?: string;
  features?: Array<{
    title: string;
    description: string;
  }>;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({
  title = 'Добро пожаловать в React Template',
  description = 'Это современный шаблон для разработки React-приложений.',
  features = [
    {
      title: 'Современный стек',
      description: 'React, TypeScript, Vite и другие современные технологии'
    },
    {
      title: 'Готовые компоненты',
      description: 'Богатый набор UI компонентов и утилит'
    },
    {
      title: 'Адаптивный дизайн',
      description: 'Красивый и отзывчивый интерфейс для всех устройств'
    }
  ]
}) => {
  return (
    <Card>
      <WelcomeTitle>{title}</WelcomeTitle>
      <WelcomeText>{description}</WelcomeText>
      <FeaturesList>
        {features.map((feature, index) => (
          <FeatureItem key={index}>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureItem>
        ))}
      </FeaturesList>
    </Card>
  );
}; 