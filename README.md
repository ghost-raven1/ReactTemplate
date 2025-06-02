/* 
 * Copyright (c) 2025 Aleksej Starodubcev (tg: @ghost_raven1). All rights reserved.
 */

# REACT TEMPLATE

Современный Темплейт для разработки React-приложения, построенное с использованием Ant Design, TypeScript и Vite.

## 🚀 Технологии

- React 18
- TypeScript
- Ant Design
- Vite
- Zustand
- React Router
- Styled Components
- ESLint + Prettier
- Vitest + Cypress

## 📦 Установка

```bash
# Клонирование репозитория
git clone [url-репозитория]

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка проекта
npm run build

# Запуск тестов
npm run test
```

## 🛠️ Скрипты

- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Сборка проекта
- `npm run preview` - Предпросмотр собранного проекта
- `npm run test` - Запуск unit-тестов
- `npm run test:coverage` - Запуск тестов с отчетом о покрытии
- `npm run test:e2e` - Запуск E2E тестов
- `npm run lint` - Проверка кода линтером
- `npm run format` - Форматирование кода
- `npm run type-check` - Проверка типов TypeScript
- `npm run security-check` - Проверка безопасности зависимостей

## 📁 Структура проекта

```
src/
├── api/          # API клиенты и методы
├── assets/       # Статические ресурсы
├── config/       # Конфигурация приложения
├── layouts/      # Компоненты макетов
├── pages/        # Страницы приложения
├── routes/       # Конфигурация маршрутизации
├── shared/       # Общие утилиты и константы
├── store/        # Управление состоянием (Zustand)
├── test/         # Тесты
└── uikit/        # UI компоненты
```

## 🔒 Безопасность

Проект использует:
- Content Security Policy (CSP)
- ESLint security rules
- Регулярные проверки зависимостей

## 🌐 Локализация

Поддержка мультиязычности через i18n.

## 📱 PWA

Приложение поддерживает PWA функционал:
- Офлайн режим
- Установка на устройство
- Push-уведомления

## 🤝 Вклад в проект

Пожалуйста, прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) для деталей о нашем процессе разработки и как вы можете внести свой вклад.

## 📝 Лицензия

MIT
