/*
 * Copyright (c) 2025 Aleksej Starodubcev (tg: @ghost_raven1). All rights reserved.
 */
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSidebarStore } from '../../../store/useSidebarStore';
import { 
  MenuOutlined, 
  HomeOutlined, 
  UserOutlined, 
  DashboardOutlined, 
  LoginOutlined,
  UserAddOutlined,
  DownOutlined
} from '@ant-design/icons';
import { routes, ROUTES } from '../../../routes/config';
import { useAuthStore } from '../../../store/useAuthStore';
import { useNotification } from '../Notification';
import { Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 24px;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CompanyName = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-left: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px 12px;
  border-radius: 6px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const UserButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  .anticon {
    font-size: 16px;
  }
`;

const getRouteIcon = (path: string) => {
  switch (path) {
    case ROUTES.HOME:
      return <HomeOutlined />;
    case ROUTES.DASHBOARD:
      return <DashboardOutlined />;
    case ROUTES.PROFILE:
      return <UserOutlined />;
    case ROUTES.LOGIN:
      return <LoginOutlined />;
    case ROUTES.REGISTER:
      return <UserAddOutlined />;
    default:
      return null;
  }
};

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { open } = useSidebarStore();
  const { isAuthenticated, user, logout, isLoading } = useAuthStore();
  const { api: notification } = useNotification();

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      notification.success({
        message: 'Вы успешно вышли из системы',
        key: 'logout-notification',
      });
      navigate(ROUTES.LOGIN);
    } catch (error) {
      notification.error({
        message: 'Не удалось выйти из системы',
        description: 'Пожалуйста, попробуйте еще раз',
        key: 'logout-error-notification',
      });
    }
  }, [logout, navigate, notification]);

  const getMainRoutes = useCallback(() => {
    return routes.filter(route => {
      if (route.path === ROUTES.LOGIN || route.path === ROUTES.REGISTER || route.path === ROUTES.NOT_FOUND) {
        return false;
      }
      if (route.meta?.auth && !isAuthenticated) {
        return false;
      }
      return true;
    });
  }, [isAuthenticated]);

  const getAuthRoutes = useCallback(() => {
    if (isAuthenticated) {
      return [];
    }
    return routes.filter(route => 
      route.path === ROUTES.LOGIN || route.path === ROUTES.REGISTER
    );
  }, [isAuthenticated]);

  const menuItems = useMemo<MenuProps['items']>(() => [
    ...getMainRoutes().map(route => ({
      key: route.path,
      icon: getRouteIcon(route.path),
      label: route.meta?.title || route.path,
      onClick: () => handleNavigate(route.path)
    })),
    ...getAuthRoutes().map(route => ({
      key: route.path,
      icon: getRouteIcon(route.path),
      label: route.meta?.title || route.path,
      onClick: () => handleNavigate(route.path)
    })),
    ...(isAuthenticated ? [{
      key: 'logout',
      icon: <LoginOutlined />,
      label: 'Выйти',
      onClick: handleLogout,
      disabled: isLoading
    }] : [])
  ], [getMainRoutes, getAuthRoutes, handleNavigate, handleLogout, isAuthenticated, isLoading]);

  const buttonText = useMemo(() => {
    if (isAuthenticated && user) {
      return user.name || 'Профиль';
    }
    return 'Войти';
  }, [isAuthenticated, user]);

  return (
    <HeaderWrapper>
      <LeftSection>
        <MenuButton onClick={open}>
          <MenuOutlined />
        </MenuButton>
        <CompanyName onClick={() => navigate(ROUTES.HOME)}>
          React Template
        </CompanyName>
      </LeftSection>
      <RightSection>
        <Dropdown 
          key={`dropdown-${isAuthenticated}-${user?.id}`}
          menu={{ items: menuItems }} 
          placement="bottomRight"
        >
          <UserButton loading={isLoading}>
            <UserOutlined />
            {buttonText}
            <DownOutlined />
          </UserButton>
        </Dropdown>
      </RightSection>
    </HeaderWrapper>
  );
}; 