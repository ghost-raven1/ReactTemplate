/*
 * Copyright (c) 2025 Aleksej Starodubcev (tg: @ghost_raven1). All rights reserved.
 */
import { useState, useCallback } from 'react';

interface FeatureFlags {
  [key: string]: boolean;
}

const defaultFeatureFlags: FeatureFlags = {
  exampleFeature: false,
};

export const useFeatureFlag = (featureName: string) => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(defaultFeatureFlags);

  const toggleFeature = useCallback((name: string) => {
    setFeatureFlags(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  }, []);

  return {
    isEnabled: featureFlags[featureName] || false,
    toggleFeature,
  };
};

// Пример использования:
// const isNewFeatureEnabled = useFeatureFlag('new-feature');
// if (isNewFeatureEnabled) {
//   // Показать новую функциональность
// } 