/*
 * Copyright (c) 2025 Aleksej Starodubcev (tg: @ghost_raven1). All rights reserved.
 */
import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../routes/config';
import { useAuth } from '../../hooks/useAuth';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useSidebarStore } from '../../../store/useSidebarStore';
import { motion } from 'framer-motion';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 64px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const MenuButton = styled(motion.button)`
  font-size: 24px;
  cursor: pointer;
  display: inline-block;
  background: none;
  border: none;
  color: #fff;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Logo = styled(motion.div)`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const StyledMenu = styled(Menu)`
  flex: 1;
  background: transparent;
  border: none;
  display: flex;
  justify-content: flex-end;
  height: 100%;

  .ant-menu-item {
    color: rgba(255, 255, 255, 0.85);
    font-size: 15px;
    padding: 0 20px;
    height: 64px;
    line-height: 64px;
    transition: all 0.3s ease;
    margin: 0 4px;
    border-radius: 8px;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    &.ant-menu-item-selected {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
      font-weight: 500;
    }
  }

  .ant-menu-item-selected::after {
    display: none;
  }
`;

const AuthButton = styled(motion.button)`
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border: none;
  padding: 0 20px;
  height: 64px;
  line-height: 64px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 4px;
  border-radius: 8px;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { toggle } = useSidebarStore();

  const menuItems = [
    {
      key: ROUTES.HOME,
      label: 'Главная',
    },
    {
      key: ROUTES.ABOUT,
      label: 'О нас',
    },
    ...(isAuthenticated
      ? [
          {
            key: ROUTES.PROFILE,
            label: 'Профиль',
          },
        ]
      : []),
  ];

  return (
    <StyledHeader>
      <HeaderContent>
        <LeftSection>
          <MenuButton 
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MenuOutlined />
          </MenuButton>
          <Logo
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            React Template
          </Logo>
        </LeftSection>
        <RightSection>
          <StyledMenu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => {
              if (key !== 'login' && key !== 'logout') {
                navigate(key);
              }
            }}
          />
          {isAuthenticated ? (
            <AuthButton
              onClick={() => {
                logout().then(() => {
                  navigate(ROUTES.HOME);
                });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Выйти
            </AuthButton>
          ) : (
            <AuthButton
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Войти
            </AuthButton>
          )}
        </RightSection>
      </HeaderContent>
    </StyledHeader>
  );
};
