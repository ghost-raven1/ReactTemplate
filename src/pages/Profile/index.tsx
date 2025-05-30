import React from 'react';
import styled from 'styled-components';
import { Card } from '../../uikit/Card';
import { PageTitle } from '../../uikit/PageTitle';
import { PageDescription } from '../../uikit/PageDescription';

const ProfileContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const InfoCard = styled(Card)`
  padding: 20px;
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 12px;
`;

const InfoText = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
`;

export const Profile: React.FC = () => {
  return (
    <ProfileContainer>
      <PageTitle>Профиль пользователя</PageTitle>
      <PageDescription>
        Здесь вы можете просмотреть и отредактировать информацию о своем профиле
      </PageDescription>

      <ProfileInfo>
        <InfoCard>
          <InfoTitle>Личная информация</InfoTitle>
          <InfoText>
            Имя: Иван Иванов<br />
            Email: ivan@example.com<br />
            Дата регистрации: 01.01.2024
          </InfoText>
        </InfoCard>

        <InfoCard>
          <InfoTitle>Настройки аккаунта</InfoTitle>
          <InfoText>
            Уведомления: Включены<br />
            Двухфакторная аутентификация: Выключена<br />
            Язык интерфейса: Русский
          </InfoText>
        </InfoCard>

        <InfoCard>
          <InfoTitle>Статистика</InfoTitle>
          <InfoText>
            Последний вход: 01.01.2024 12:00<br />
            Активность: Высокая<br />
            Статус: Активен
          </InfoText>
        </InfoCard>
      </ProfileInfo>
    </ProfileContainer>
  );
}; 