import React from 'react';
import { Typography, Card } from '../../uikit';

export const Profile: React.FC = () => {
  return (
    <div>
      <Typography.Title level={1}>Профиль пользователя</Typography.Title>
      <Card>
        <Typography.Paragraph>
          Здесь будет информация о пользователе и его настройках.
        </Typography.Paragraph>
      </Card>
    </div>
  );
}; 