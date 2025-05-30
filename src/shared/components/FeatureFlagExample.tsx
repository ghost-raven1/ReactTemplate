/*
 * Copyright (c) 2025 Aleksej Starodubcev (tg: @ghost_raven1). All rights reserved.
 */
import React from 'react';
import { Card, Typography } from 'antd';
import { useFeatureFlag } from '../hooks/useFeatureFlag';

const { Title, Text } = Typography;

export const FeatureFlagExample: React.FC = () => {
  const isNewFeatureEnabled = useFeatureFlag('new-feature');
  const isBetaFeatureEnabled = useFeatureFlag('beta-feature');

  return (
    <Card>
      <Title level={4}>Feature Flags Example</Title>
      <div style={{ marginTop: 16 }}>
        <Text>New Feature Status: {isNewFeatureEnabled ? 'Enabled' : 'Disabled'}</Text>
        <br />
        <Text>Beta Feature Status: {isBetaFeatureEnabled ? 'Enabled' : 'Disabled'}</Text>
      </div>
      {isNewFeatureEnabled && (
        <div style={{ marginTop: 16, padding: 16, background: '#f0f2f5', borderRadius: 4 }}>
          <Text strong>New Feature Content</Text>
          <p>This content is only visible when the new-feature flag is enabled.</p>
        </div>
      )}
      {isBetaFeatureEnabled && (
        <div style={{ marginTop: 16, padding: 16, background: '#e6f7ff', borderRadius: 4 }}>
          <Text strong>Beta Feature Content</Text>
          <p>This content is only visible when the beta-feature flag is enabled.</p>
        </div>
      )}
    </Card>
  );
}; 