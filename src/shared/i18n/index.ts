import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      navigation: {
        home: 'Home',
        about: 'About',
        profile: 'Profile',
        login: 'Login',
        logout: 'Logout',
      },
      auth: {
        login: 'Login',
        register: 'Register',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        name: 'Name',
        loginSuccess: 'Successfully logged in',
        loginError: 'Failed to login',
        registerSuccess: 'Successfully registered',
        registerError: 'Failed to register',
      },
      errors: {
        required: 'This field is required',
        invalidEmail: 'Invalid email format',
        invalidPassword: 'Password must be at least 6 characters',
        passwordsDoNotMatch: 'Passwords do not match',
        somethingWentWrong: 'Something went wrong',
        unknownError: 'An unknown error occurred',
        reloadPage: 'Reload Page',
      },
    },
  },
  ru: {
    translation: {
      navigation: {
        home: 'Главная',
        about: 'О нас',
        profile: 'Профиль',
        login: 'Войти',
        logout: 'Выйти',
      },
      auth: {
        login: 'Вход',
        register: 'Регистрация',
        email: 'Email',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        name: 'Имя',
        loginSuccess: 'Успешный вход',
        loginError: 'Ошибка входа',
        registerSuccess: 'Успешная регистрация',
        registerError: 'Ошибка регистрации',
      },
      errors: {
        required: 'Это поле обязательно',
        invalidEmail: 'Неверный формат email',
        invalidPassword: 'Пароль должен быть не менее 6 символов',
        passwordsDoNotMatch: 'Пароли не совпадают',
        somethingWentWrong: 'Что-то пошло не так',
        unknownError: 'Произошла неизвестная ошибка',
        reloadPage: 'Перезагрузить страницу',
      },
    },
  },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage' ],
      },
    }).then();

export default i18n;
