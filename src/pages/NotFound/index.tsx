import React from 'react';
import styled from 'styled-components';
import { Card } from '../../uikit/Card';
import { PageTitle } from '../../uikit/PageTitle';
import { PageDescription } from '../../uikit/PageDescription';

const NotFoundContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const ErrorCode = styled.div`
  font-size: 120px;
  font-weight: 700;
  color: #2196F3;
  margin: 40px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

export const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <Card>
        <ErrorCode>404</ErrorCode>
        <PageTitle>Страница не найдена</PageTitle>
        <PageDescription>
          К сожалению, запрашиваемая страница не существует или была перемещена.
          Пожалуйста, проверьте URL или вернитесь на главную страницу.
        </PageDescription>
      </Card>
    </NotFoundContainer>
  );
}; 