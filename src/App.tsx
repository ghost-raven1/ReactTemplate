import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { Router } from './routes/Router';
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import { NotificationProvider } from './shared/components/Notification';
import './shared/i18n';
import './App.css';
import styled from "styled-components";
import { Sidebar } from './shared/components/Sidebar';
import { Header } from './shared/components/Header';
import { DevMode } from './shared/components/DevMode';
import { useDevMode } from './shared/hooks/useDevMode';
import { FlagProvider } from '@unleash/proxy-client-react';
import { unleashClient } from './config/unleash';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  padding: 24px;
  margin-top: 64px;
  background: #f0f2f5;
`;

export const App: React.FC = () => {
  const { isOpen, close } = useDevMode();

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <FlagProvider unleashClient={unleashClient}>
          <BrowserRouter>
            <StyledLayout>
              <Sidebar />
              <Layout>
                <Header />
                <StyledContent>
                  <Router />
                </StyledContent>
              </Layout>
            </StyledLayout>
            <DevMode isOpen={isOpen} onClose={close} />
          </BrowserRouter>
        </FlagProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
};
