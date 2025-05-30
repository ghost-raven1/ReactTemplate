import React from 'react';
import styled from 'styled-components';
import { Card } from '../../uikit/Card';
import { PageTitle } from '../../uikit/PageTitle';
import { PageDescription } from '../../uikit/PageDescription';
import { FeaturesGrid } from '../../uikit/FeaturesGrid';
import { FeatureCard } from '../../uikit/FeatureCard';

const HomeContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const features = [
  {
    title: 'Современный стек',
    description: 'React 18, TypeScript, Vite, Styled Components и другие современные технологии для быстрой и надежной разработки'
  },
  {
    title: 'Готовые компоненты',
    description: 'Богатый набор UI компонентов, включая карточки, кнопки, формы и другие элементы интерфейса'
  },
  {
    title: 'Адаптивный дизайн',
    description: 'Красивый и отзывчивый интерфейс, который отлично выглядит на всех устройствах и разрешениях экрана'
  },
  {
    title: 'Маршрутизация',
    description: 'Встроенная система маршрутизации с защищенными маршрутами и навигацией'
  },
  {
    title: 'Аутентификация',
    description: 'Готовая система аутентификации с поддержкой входа, регистрации и управления сессиями'
  },
  {
    title: 'Стилизация',
    description: 'Современный дизайн с использованием Styled Components и готовыми темами'
  }
];

export const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Card>
        <Section>
          <PageTitle>Добро пожаловать в React Template</PageTitle>
          <PageDescription>
            Это современный шаблон для разработки React-приложений.
          </PageDescription>
          <PageDescription>
            Здесь вы найдете все необходимые инструменты и компоненты для быстрого старта вашего проекта.
            Шаблон включает в себя настройку маршрутизации, аутентификацию, стилизацию и многое другое.
          </PageDescription>
        </Section>

        <Section>
          <PageTitle>Возможности шаблона</PageTitle>
          <PageDescription>
            Наш шаблон предоставляет все необходимые инструменты для создания современных веб-приложений.
            Выберите нужные компоненты и начните разработку прямо сейчас.
          </PageDescription>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </FeaturesGrid>
        </Section>

        <Section>
          <PageTitle>Начало работы</PageTitle>
          <PageDescription>
            Для начала работы с шаблоном, просто клонируйте репозиторий и установите зависимости.
            Все необходимые инструкции вы найдете в документации проекта.
          </PageDescription>
        </Section>
      </Card>
    </HomeContainer>
  );
}; 