# Руководство по стилю кода

## Общие принципы

1. Используйте TypeScript для всех файлов
2. Следуйте принципам функционального программирования
3. Используйте современные возможности ES6+
4. Придерживайтесь принципов SOLID

## Структура проекта

```
src/
  ├── api/          # API клиенты и интерцепторы
  ├── assets/       # Статические ресурсы
  ├── components/   # Переиспользуемые компоненты
  ├── config/       # Конфигурация приложения
  ├── hooks/        # Пользовательские хуки
  ├── layouts/      # Компоненты макетов
  ├── pages/        # Компоненты страниц
  ├── routes/       # Конфигурация маршрутизации
  ├── store/        # Управление состоянием
  ├── styles/       # Глобальные стили
  ├── types/        # TypeScript типы
  ├── utils/        # Утилиты и хелперы
  └── uikit/        # UI компоненты
```

## Именование

### Файлы и директории

- Используйте PascalCase для компонентов: `Button.tsx`, `UserProfile.tsx`
- Используйте camelCase для утилит и хуков: `useAuth.ts`, `formatDate.ts`
- Используйте kebab-case для стилей: `button-styles.css`

### Компоненты

- Используйте PascalCase для имен компонентов
- Используйте суффикс `Props` для интерфейсов пропсов
- Используйте префикс `use` для хуков

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick }) => {
  // ...
};
```

### Переменные и функции

- Используйте camelCase для переменных и функций
- Используйте префикс `is` или `has` для булевых значений
- Используйте глаголы для функций-действий

```typescript
const isLoading = true;
const hasError = false;
const handleClick = () => {};
const fetchData = async () => {};
```

## Компоненты

### Структура компонента

```typescript
// Импорты
import React from 'react';
import { useTranslation } from 'react-i18next';

// Типы
interface ComponentProps {
  // ...
}

// Компонент
export const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Хуки
  const { t } = useTranslation();
  
  // Логика
  
  // Рендер
  return (
    // ...
  );
};
```

### Стилизация

- Используйте styled-components для стилизации
- Следуйте методологии BEM для именования классов
- Используйте переменные темы для цветов и размеров

```typescript
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
`;
```

## Управление состоянием

### Zustand

- Используйте префикс `use` для сторов
- Разделяйте сторы по функциональности
- Используйте селекторы для доступа к данным

```typescript
interface StoreState {
  data: Data[];
  isLoading: boolean;
  error: Error | null;
}

export const useStore = create<StoreState>((set) => ({
  data: [],
  isLoading: false,
  error: null,
  setData: (data: Data[]) => set({ data }),
}));
```

## Обработка ошибок

- Используйте ErrorBoundary для перехвата ошибок React
- Логируйте ошибки в консоль
- Показывайте пользователю понятные сообщения об ошибках

## Тестирование

- Используйте Jest для модульных тестов
- Используйте React Testing Library для тестирования компонентов
- Следуйте принципу AAA (Arrange, Act, Assert)

```typescript
describe('Component', () => {
  it('should render correctly', () => {
    // Arrange
    const props = { /* ... */ };
    
    // Act
    render(<Component {...props} />);
    
    // Assert
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
```

## Документация

- Документируйте все публичные API
- Используйте JSDoc для документирования функций
- Поддерживайте актуальность README.md

```typescript
/**
 * Форматирует дату в указанный формат
 * @param date - Дата для форматирования
 * @param format - Формат даты
 * @returns Отформатированная дата
 */
const formatDate = (date: Date, format: string): string => {
  // ...
};
```

## Git

### Коммиты

- Используйте Conventional Commits
- Пишите понятные сообщения коммитов
- Разделяйте изменения на логические коммиты

```
feat: add user authentication
fix: resolve navigation issues
docs: update README
```

### Ветки

- Используйте feature branches
- Следуйте naming convention: `feature/`, `bugfix/`, `hotfix/`
- Удаляйте ветки после мерджа

## Производительность

- Используйте React.memo для оптимизации рендеринга
- Используйте useMemo и useCallback для мемоизации
- Следите за размером бандла

## Доступность

- Используйте семантические HTML теги
- Добавляйте ARIA атрибуты
- Обеспечивайте поддержку клавиатурной навигации

## Безопасность

- Валидируйте все пользовательские входные данные
- Используйте HTTPS
- Защищайте чувствительные данные
- Следуйте принципу наименьших привилегий 