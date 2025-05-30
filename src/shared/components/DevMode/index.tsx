/*
 * Copyright (c) 2025 Aleksej Starodubcev (tg: @ghost_raven1). All rights reserved.
 */
import React from 'react';
import { Card, Switch, Typography, Modal } from 'antd';
import { useDevMode } from '../../hooks/useDevMode';

const { Title, Text } = Typography;

interface DevModeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevMode: React.FC<DevModeProps> = ({ isOpen, onClose }) => {
  const { isDevModeEnabled, toggleDevMode } = useDevMode();

  return (
    <Modal
      title="Dev Mode"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Switch checked={isDevModeEnabled} onChange={toggleDevMode} />
        <Text>Enable Dev Mode</Text>
      </div>
    </Modal>
  );
}; 