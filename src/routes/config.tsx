import { lazy } from 'react';
import type { ComponentType } from 'react';

// Типы для маршрутов
export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<ComponentType<any>>;
  exact?: boolean;
  children?: RouteConfig[];
  meta?: {
    title?: string;
    auth?: boolean;
    roles?: string[];
  };
  isProtected?: boolean;
}

// Ленивая загрузка компонентов
const Home = lazy(() => import('../pages/Home/index').then(module => ({ default: module.Home })));
const Profile = lazy(() => import('../pages/Profile').then(module => ({ default: module.Profile })));
const NotFound = lazy(() => import('../pages/NotFound').then(module => ({ default: module.NotFound })));
const LoginForm = lazy(() => import('../pages/Auth/LoginForm/LoginForm.tsx').then(module => ({ default: module.LoginForm })));
const RegisterForm = lazy(() => import('../pages/Auth/RegisterForm/RegisterForm.tsx').then(module => ({ default: module.RegisterForm })));
const Dashboard = lazy(() => import('../pages/Dashboard').then(module => ({ default: module.Dashboard })));

// Константы путей
export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  NOT_FOUND: '*',
} as const;

// Конфигурация маршрутов
export const routes: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    component: Home,
    exact: true,
    meta: {
      title: 'Главная',
    },
  },
  {
    path: ROUTES.PROFILE,
    component: Profile,
    exact: true,
    meta: {
      title: 'Личный кабинет',
      auth: true,
    },
    isProtected: true,
  },
  {
    path: ROUTES.DASHBOARD,
    component: Dashboard,
    exact: true,
    meta: {
      title: 'Панель управления',
      auth: true,
    },
    isProtected: true,
  },
  {
    path: ROUTES.LOGIN,
    component: LoginForm,
    meta: {
      title: 'Вход',
    },
  },
  {
    path: ROUTES.REGISTER,
    component: RegisterForm,
    meta: {
      title: 'Регистрация',
    },
  },
  {
    path: ROUTES.NOT_FOUND,
    component: NotFound,
    meta: {
      title: 'Страница не найдена',
    },
  },
];
