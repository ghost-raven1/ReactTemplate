import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { routes, type RouteConfig } from './config';
import { PageTransition } from '../shared/components/PageTransition';
import { useAuthStore } from '../store/useAuthStore';

// Компонент для проверки авторизации
const PrivateRoute: React.FC<{ children: React.ReactNode; auth?: boolean }> = ({
  children,
  auth,
}) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  if (auth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Рекурсивный рендеринг маршрутов
const renderRoutes = (routes: RouteConfig[]) => {
  return routes.map((route) => {
    const { path, component: Component, children, meta } = route;

    return (
      <Route
        key={path}
        path={path}
        element={
          <PrivateRoute auth={meta?.auth}>
            <Suspense 
              fallback={
                <PageTransition>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Spin size="large" />
                  </div>
                </PageTransition>
              }
            >
              <PageTransition>
                <Component />
              </PageTransition>
            </Suspense>
          </PrivateRoute>
        }
      >
        {children && renderRoutes(children)}
      </Route>
    );
  });
};

// Основной компонент роутера
export const Router: React.FC = () => {
  return <Routes>{renderRoutes(routes)}</Routes>;
};
