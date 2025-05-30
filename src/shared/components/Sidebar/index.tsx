/*
 * Copyright (c) 2025 Aleksej Starodubcev (tg: @ghost_raven1). All rights reserved.
 */
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebarStore } from '../../../store/useSidebarStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloseOutlined,
  HomeOutlined,
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { routes, ROUTES } from '../../../routes/config';
import { useAuth } from '../../hooks/useAuth';

const SidebarWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
`;

const SidebarPanel = styled(motion.div)`
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  height: 100%;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
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

const MenuList = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItem = styled(motion.div)<{ active?: boolean }>`
  padding: 12px 16px;
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.85)'};
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

const MenuIcon = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const overlayVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

const menuItemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3
    }
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3
    }
  }
};

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

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, close } = useSidebarStore();
  const { isAuthenticated, logout } = useAuth();

  const handleNavigate = (path: string) => {
    navigate(path);
    close();
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate(ROUTES.HOME);
    }
  };

  const getMainRoutes = () => {
    return routes.filter(route => {
      if (route.path === ROUTES.LOGIN || route.path === ROUTES.REGISTER || route.path === ROUTES.NOT_FOUND) {
        return false;
      }
      if (route.meta?.auth && !isAuthenticated) {
        return false;
      }
      return true;
    });
  };

  const getAuthRoutes = () => {
    if (isAuthenticated) {
      return [];
    }
    return routes.filter(route =>
      route.path === ROUTES.LOGIN || route.path === ROUTES.REGISTER
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={close}
          />
          <SidebarWrapper
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <SidebarPanel>
              <CloseButton
                onClick={close}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CloseOutlined />
              </CloseButton>
              <MenuList>
                {getMainRoutes().map((route, index) => (
                  <MenuItem
                    key={route.path}
                    active={location.pathname === route.path}
                    onClick={() => handleNavigate(route.path)}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MenuIcon>{getRouteIcon(route.path)}</MenuIcon>
                    {route.meta?.title || route.path}
                  </MenuItem>
                ))}
                {getAuthRoutes().map((route, index) => (
                  <MenuItem
                    key={route.path}
                    active={location.pathname === route.path}
                    onClick={() => handleNavigate(route.path)}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: (getMainRoutes().length + index) * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MenuIcon>{getRouteIcon(route.path)}</MenuIcon>
                    {route.meta?.title || route.path}
                  </MenuItem>
                ))}
                {isAuthenticated && (
                  <MenuItem
                    onClick={handleLogout}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: (getMainRoutes().length + getAuthRoutes().length) * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MenuIcon><LogoutOutlined /></MenuIcon>
                    Выйти
                  </MenuItem>
                )}
              </MenuList>
            </SidebarPanel>
          </SidebarWrapper>
        </>
      )}
    </AnimatePresence>
  );
};
