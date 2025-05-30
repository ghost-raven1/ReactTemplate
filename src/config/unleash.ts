import { UnleashClient } from '@unleash/proxy-client-react';

export const unleashConfig = {
  url: import.meta.env.VITE_UNLEASH_URL || 'http://localhost:4242/api/frontend',
  clientKey: import.meta.env.VITE_UNLEASH_CLIENT_KEY || 'default:development.unleash-insecure-api-token',
  appName: 'react-template',
  refreshInterval: 15, // seconds
  metricsInterval: 60, // seconds
  environment: import.meta.env.NODE_ENV || 'development',
};

export const unleashClient = new UnleashClient(unleashConfig);
