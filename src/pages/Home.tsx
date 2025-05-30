/*
 * Copyright (c) 2025 Aleksej Starodubcev (tg: @ghost_raven1). All rights reserved.
 */
import React from 'react';
import { Typography } from 'antd';
import { useAuth } from '../shared/hooks/useAuth';
import { useNotification } from '../shared/components/Notification';
import { useFeatureFlag } from '../shared/hooks/useFeatureFlag';
import { FeatureFlagExample } from '../shared/components/FeatureFlagExample';
import { useDevMode } from '../shared/hooks/useDevMode';
import { DevMode } from '../shared/components/DevMode';

const { Title } = Typography;

export const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const notification = useNotification();
  const isNewFeatureEnabled = useFeatureFlag('new-feature');
  const { isDevModeEnabled } = useDevMode();

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Добро пожаловать в React Template</Title>
      <p>Это современный шаблон для разработки React-приложений.</p>
      
      {isDevModeEnabled && <DevMode />}
      
      {isNewFeatureEnabled && (
        <div style={{ marginTop: '24px' }}>
          <FeatureFlagExample />
        </div>
      )}
    </div>
  );
}; 