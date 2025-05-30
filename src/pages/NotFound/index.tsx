import React from 'react';
import { Typography, Button } from '../../uikit';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/config';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px 0' }}>
      <Typography.Title level={1}>404</Typography.Title>
      <Typography.Title level={2}>Страница не найдена</Typography.Title>
      <Typography.Paragraph>
        Извините, запрашиваемая страница не существует.
      </Typography.Paragraph>
      <Button type="primary" onClick={() => navigate(ROUTES.HOME)}>
        Вернуться на главную
      </Button>
    </div>
  );
}; 