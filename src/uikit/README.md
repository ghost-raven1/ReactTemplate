# Документация UI Kit

Этот UI Kit предоставляет набор переиспользуемых компонентов, построенных на основе Ant Design, стилизованных с помощью styled-components и расширенных дополнительными возможностями.

## Установка

UI Kit уже включен в проект. Для использования просто импортируйте компоненты из директории `uikit`:

```typescript
import { Button, Input, Card, Typography } from './uikit';
```

## Компоненты

### Button (Кнопка)

Настраиваемый компонент кнопки с различными стилями и размерами.

```typescript
import { Button } from './uikit';

// Базовое использование
<Button variant="primary">Нажми меня</Button>

// Свойства
interface ButtonProps {
  variant?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  size?: 'small' | 'middle' | 'large';
  fullWidth?: boolean;
  // ... другие свойства Ant Design Button
}
```

### Input (Поле ввода)

Компонент текстового поля с поддержкой состояния ошибки и полной ширины.

```typescript
import { Input } from './uikit';

// Базовое использование
<Input placeholder="Введите текст" />

// С состоянием ошибки
<Input error placeholder="Поле с ошибкой" />

// На всю ширину
<Input fullWidth placeholder="Поле на всю ширину" />

// Свойства
interface InputProps {
  fullWidth?: boolean;
  error?: boolean;
  // ... другие свойства Ant Design Input
}
```

### Card (Карточка)

Компонент карточки с эффектами при наведении и настройкой границ.

```typescript
import { Card } from './uikit';

// Базовое использование
<Card title="Заголовок карточки">Содержимое карточки</Card>

// С эффектом при наведении
<Card hoverable>Карточка с эффектом</Card>

// Без границы
<Card bordered={false}>Карточка без границы</Card>

// Свойства
interface CardProps {
  fullWidth?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  // ... другие свойства Ant Design Card
}
```

### Typography (Типографика)

Компоненты для текста, обеспечивающие единообразную типографику во всем приложении.

```typescript
import { Typography, Title, Text, Paragraph } from './uikit';

// Заголовок
<Title level={1}>Заголовок 1</Title>
<Title level={2}>Заголовок 2</Title>

// Текст
<Text>Обычный текст</Text>
<Text strong>Жирный текст</Text>

// Параграф
<Paragraph>Длинный текст</Paragraph>

// Свойства
interface TypographyProps {
  color?: string;
  weight?: number;
  align?: 'left' | 'center' | 'right';
  // ... другие свойства Ant Design Typography
}
```

### Select (Выпадающий список)

Компонент выпадающего списка с поддержкой состояния ошибки и полной ширины.

```typescript
import { Select } from './uikit';

// Базовое использование
<Select
  options={[
    { value: '1', label: 'Опция 1' },
    { value: '2', label: 'Опция 2' },
  ]}
/>

// С состоянием ошибки
<Select error />

// На всю ширину
<Select fullWidth />

// Свойства
interface SelectProps {
  fullWidth?: boolean;
  error?: boolean;
  // ... другие свойства Ant Design Select
}
```

### Modal (Модальное окно)

Компонент модального окна с поддержкой различных типов и анимаций.

```typescript
import { Modal } from './uikit';

// Базовое использование
<Modal
  title="Заголовок"
  open={isOpen}
  onCancel={handleClose}
>
  Содержимое модального окна
</Modal>

// Различные типы модальных окон
<Modal type="success" title="Успех">
  Операция выполнена успешно
</Modal>

<Modal type="warning" title="Предупреждение">
  Внимание! Это действие нельзя отменить
</Modal>

<Modal type="error" title="Ошибка">
  Произошла ошибка при выполнении операции
</Modal>

// Свойства
interface ModalProps {
  type?: 'default' | 'confirm' | 'info' | 'success' | 'warning' | 'error';
  fullWidth?: boolean;
  centered?: boolean;
  showCloseIcon?: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  // ... другие свойства Ant Design Modal
}
```

### Alert (Уведомление)

Компонент уведомления с пользовательскими стилями для разных типов.

```typescript
import { Alert } from './uikit';

// Базовое использование
<Alert message="Успех" type="success" />

// С описанием
<Alert
  message="Ошибка"
  description="Подробное описание ошибки"
  type="error"
/>

// Закрываемое
<Alert closable message="Предупреждение" type="warning" />

// Свойства
interface AlertProps {
  fullWidth?: boolean;
  closable?: boolean;
  // ... другие свойства Ant Design Alert
}
```

## Тема

UI Kit использует объект темы для единообразного стилевого оформления. Вы можете получить доступ к значениям темы в ваших styled-components:

```typescript
import styled from 'styled-components';

const StyledComponent = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;
```

### Структура темы

```typescript
const theme = {
  colors: {
    primary: '#1890ff',    // Основной цвет
    secondary: '#52c41a',  // Вторичный цвет
    error: '#ff4d4f',      // Цвет ошибки
    warning: '#faad14',    // Цвет предупреждения
    success: '#52c41a',    // Цвет успеха
    background: '#ffffff', // Цвет фона
    text: 'rgba(0, 0, 0, 0.85)',           // Основной цвет текста
    textSecondary: 'rgba(0, 0, 0, 0.45)',  // Вторичный цвет текста
    border: '#d9d9d9',     // Цвет границы
  },
  spacing: {
    xs: '4px',   // Очень маленький отступ
    sm: '8px',   // Маленький отступ
    md: '16px',  // Средний отступ
    lg: '24px',  // Большой отступ
    xl: '32px',  // Очень большой отступ
  },
  borderRadius: {
    sm: '2px',  // Маленький радиус
    md: '4px',  // Средний радиус
    lg: '8px',  // Большой радиус
  },
  // ... другие свойства темы
};
```

## Лучшие практики

1. Всегда используйте компоненты UI Kit вместо компонентов Ant Design для единообразного стилевого оформления
2. Используйте значения темы для цветов, отступов и других дизайн-токенов
3. Расширяйте компоненты с помощью styled-components при необходимости
4. Сохраняйте согласованность пропсов с API Ant Design
5. Используйте TypeScript для лучшей типизации и разработки

## Примеры использования

### Форма входа

```typescript
import { Card, Input, Button, Typography } from './uikit';

const LoginForm = () => {
  return (
    <Card title="Вход в систему">
      <Input placeholder="Email" />
      <Input type="password" placeholder="Пароль" />
      <Button variant="primary" fullWidth>
        Войти
      </Button>
    </Card>
  );
};
```

### Модальное окно с подтверждением и уведомлением

```typescript
import { Modal, Button, Notification } from './uikit';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    Notification.success({
      message: 'Успех',
      description: 'Элемент успешно удален',
    });
    onClose();
  };

  return (
    <Modal
      title="Подтверждение удаления"
      open={isOpen}
      onCancel={onClose}
      type="warning"
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отмена
        </Button>,
        <Button key="confirm" variant="primary" onClick={handleConfirm}>
          Удалить
        </Button>,
      ]}
    >
      <Typography.Text>
        Вы уверены, что хотите удалить этот элемент? Это действие нельзя отменить.
      </Typography.Text>
    </Modal>
  );
};
```

### Форма с подсказками и уведомлениями

```typescript
import { Form, Input, Button, Tooltip, Notification } from './uikit';

const RegistrationForm = () => {
  const handleSubmit = (values) => {
    // Обработка формы
    Notification.success({
      message: 'Успех',
      description: 'Регистрация успешно завершена',
    });
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email' }]}
      >
        <Tooltip
          title="Введите действующий email адрес"
          placement="right"
        >
          <Input placeholder="Email" />
        </Tooltip>
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, min: 6 }]}
      >
        <Tooltip
          title="Пароль должен содержать минимум 6 символов"
          placement="right"
        >
          <Input type="password" placeholder="Пароль" />
        </Tooltip>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Зарегистрироваться
      </Button>
    </Form>
  );
};
```

## Система уведомлений

Система уведомлений для отображения важных сообщений пользователю.

```typescript
import { Notification } from './uikit';

// Инициализация системы уведомлений
const NotificationContext = Notification.init();

// В корневом компоненте
function App() {
  return (
    <>
      <NotificationContext />
      {/* Остальные компоненты */}
    </>
  );
}

// Использование
// Успешное уведомление
Notification.success({
  message: 'Успех',
  description: 'Операция выполнена успешно',
  duration: 4.5,
  placement: 'topRight',
});

// Уведомление об ошибке
Notification.error({
  message: 'Ошибка',
  description: 'Произошла ошибка при выполнении операции',
});

// Предупреждение
Notification.warning({
  message: 'Предупреждение',
  description: 'Это действие нельзя отменить',
});

// Информационное уведомление
Notification.info({
  message: 'Информация',
  description: 'Важная информация для пользователя',
});

// Свойства
interface NotificationProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  showIcon?: boolean;
  message: string;
  description?: string;
  // ... другие свойства Ant Design Notification
}
```

## Система тултипов

Компонент для отображения всплывающих подсказок.

```typescript
import { Tooltip } from './uikit';

// Базовое использование
<Tooltip title="Подсказка">
  <Button>Наведите на меня</Button>
</Tooltip>

// Различные типы тултипов
<Tooltip type="light" title="Светлая подсказка">
  <Button>Светлая подсказка</Button>
</Tooltip>

<Tooltip type="dark" title="Темная подсказка">
  <Button>Темная подсказка</Button>
</Tooltip>

// Размещение
<Tooltip placement="bottom" title="Подсказка снизу">
  <Button>Подсказка снизу</Button>
</Tooltip>

<Tooltip placement="left" title="Подсказка слева">
  <Button>Подсказка слева</Button>
</Tooltip>

// Свойства
interface TooltipProps {
  type?: 'default' | 'light' | 'dark';
  arrow?: boolean;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'focus' | 'click';
  showDelay?: number;
  hideDelay?: number;
  title: string;
  // ... другие свойства Ant Design Tooltip
}
```

## Система управления формами

Расширенная система управления формами на основе Ant Design Form с дополнительными возможностями.

```typescript
import { FormManager, useFormManager } from './uikit';

// Использование хука для управления формой
const MyForm = () => {
  const { form, formManager, formProps } = useFormManager('myForm', {
    autoSave: true,
    autoSaveDelay: 1000,
    showValidationMessages: true,
    initialValues: {
      username: '',
      email: '',
    },
  });

  const handleSubmit = async (values: any) => {
    const result = await formManager.validateForm(form);
    if (result.success) {
      // Обработка успешной отправки
    }
  };

  return (
    <Form {...formProps} onFinish={handleSubmit}>
      <Form.Item
        name="username"
        label="Имя пользователя"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true },
          { type: 'email' }
        ]}
      >
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Отправить
      </Button>
    </Form>
  );
};

// Использование класса FormManager напрямую
const formManager = FormManager.getInstance();

// Инициализация формы
formManager.initForm('formId', initialValues);

// Сохранение состояния
formManager.saveFormState('formId', values);

// Получение состояния
const savedState = formManager.getFormState('formId');

// Очистка состояния
formManager.clearFormState('formId');

// Валидация формы
const result = await formManager.validateForm(form);

// Сброс формы
formManager.resetForm(form);

// Установка значений
formManager.setFormValues(form, values);
```

### Свойства FormManager

```typescript
interface FormManagerProps {
  form?: FormInstance;                    // Экземпляр формы Ant Design
  initialValues?: Record<string, any>;    // Начальные значения формы
  onFinish?: (values: any) => void;       // Обработчик успешной отправки
  onFinishFailed?: (errorInfo: any) => void; // Обработчик ошибки отправки
  onValuesChange?: (changedValues: any, allValues: any) => void; // Обработчик изменения значений
  autoSave?: boolean;                     // Включить автосохранение
  autoSaveDelay?: number;                 // Задержка автосохранения (мс)
  showValidationMessages?: boolean;       // Показывать сообщения валидации
}
```

### Примеры использования

#### Форма с автосохранением

```typescript
const AutoSaveForm = () => {
  const { form, formProps } = useFormManager('autoSaveForm', {
    autoSave: true,
    autoSaveDelay: 2000,
  });

  return (
    <Form {...formProps}>
      <Form.Item
        name="title"
        label="Заголовок"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="content"
        label="Содержание"
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};
```

#### Форма с зависимыми полями

```typescript
const DependentFieldsForm = () => {
  const { form, formProps } = useFormManager('dependentForm');

  return (
    <Form {...formProps}>
      <Form.Item
        name="type"
        label="Тип"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="personal">Личный</Select.Option>
          <Select.Option value="business">Бизнес</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.type !== currentValues.type
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('type') === 'business' ? (
            <Form.Item
              name="company"
              label="Компания"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
    </Form>
  );
};
```

#### Форма с валидацией и обработкой ошибок

```typescript
const ValidationForm = () => {
  const { form, formManager, formProps } = useFormManager('validationForm', {
    showValidationMessages: true,
  });

  const handleSubmit = async () => {
    const result = await formManager.validateForm(form);
    if (result.success) {
      // Обработка успешной валидации
      console.log('Form is valid:', result.values);
    } else {
      // Обработка ошибок валидации
      console.error('Validation failed:', result.error);
    }
  };

  return (
    <Form {...formProps} onFinish={handleSubmit}>
      <Form.Item
        name="password"
        label="Пароль"
        rules={[
          { required: true },
          { min: 6, message: 'Минимум 6 символов' },
          { pattern: /[A-Z]/, message: 'Минимум 1 заглавная буква' },
          { pattern: /[0-9]/, message: 'Минимум 1 цифра' },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Подтверждение пароля"
        dependencies={['password']}
        rules={[
          { required: true },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
    </Form>
  );
};
```

## Система хранения данных

Набор хуков для работы с различными типами хранилищ данных в браузере.

### useLocalStorage

Хук для работы с localStorage. Сохраняет данные между сессиями браузера.

```typescript
import { useLocalStorage } from './uikit';

const MyComponent = () => {
  const [value, setValue, removeValue] = useLocalStorage('key', initialValue);

  return (
    <div>
      <p>Значение: {value}</p>
      <button onClick={() => setValue('новое значение')}>
        Изменить значение
      </button>
      <button onClick={removeValue}>
        Удалить значение
      </button>
    </div>
  );
};
```

### useSessionStorage

Хук для работы с sessionStorage. Сохраняет данные только на время текущей сессии.

```typescript
import { useSessionStorage } from './uikit';

const MyComponent = () => {
  const [value, setValue, removeValue] = useSessionStorage('key', initialValue);

  return (
    <div>
      <p>Значение: {value}</p>
      <button onClick={() => setValue('новое значение')}>
        Изменить значение
      </button>
      <button onClick={removeValue}>
        Удалить значение
      </button>
    </div>
  );
};
```

## Утилиты

### DataUtils

Утилиты для работы с данными:

#### deepMerge
Глубокое слияние объектов с сохранением вложенной структуры.
```typescript
const result = deepMerge(target, source);
```

#### deepClone
Создание глубокой копии объекта.
```typescript
const copy = deepClone(obj);
```

#### get
Получение значения из объекта по пути.
```typescript
const value = get(obj, 'path.to.property', defaultValue);
```

#### set
Установка значения в объект по пути.
```typescript
const result = set(obj, 'path.to.property', value);
```

#### unset
Удаление значения из объекта по пути.
```typescript
const success = unset(obj, 'path.to.property');
```

#### isEmpty
Проверка на пустой объект.
```typescript
const isEmpty = isEmpty(obj);
```

#### pick
Фильтрация объекта по ключам.
```typescript
const filtered = pick(obj, ['key1', 'key2']);
```

#### omit
Исключение ключей из объекта.
```typescript
const filtered = omit(obj, ['key1', 'key2']);
```

### FormatUtils

Утилиты для форматирования данных:

#### formatNumber
Форматирование числа с разделителями.
```typescript
const formatted = formatNumber(1234567.89);
```

#### formatCurrency
Форматирование валюты.
```typescript
const formatted = formatCurrency(1234.56, 'RUB');
```

#### formatDate
Форматирование даты.
```typescript
const formatted = formatDate(new Date(), { year: 'numeric', month: 'long' });
```

#### formatTime
Форматирование времени.
```typescript
const formatted = formatTime(new Date(), { hour: '2-digit', minute: '2-digit' });
```

#### formatRelativeTime
Форматирование относительного времени.
```typescript
const formatted = formatRelativeTime(new Date());
```

#### formatFileSize
Форматирование размера файла.
```typescript
const formatted = formatFileSize(1024 * 1024); // "1 МБ"
```

#### formatPhoneNumber
Форматирование номера телефона.
```typescript
const formatted = formatPhoneNumber('+79991234567');
```

#### formatFileName
Форматирование имени файла с обрезкой.
```typescript
const formatted = formatFileName('very-long-file-name.txt', 20);
```

#### formatTextWithLineBreaks
Форматирование текста с переносами строк.
```typescript
const formatted = formatTextWithLineBreaks('Line 1\nLine 2');
```

#### formatJSON
Форматирование JSON с отступами.
```typescript
const formatted = formatJSON({ key: 'value' }, 2);
```

### ValidationUtils

Утилиты для валидации данных:

#### isValidEmail
Проверка email.
```typescript
const isValid = isValidEmail('user@example.com');
```

#### isValidPhone
Проверка номера телефона.
```typescript
const isValid = isValidPhone('+79991234567');
```

#### isValidPassword
Проверка пароля.
```typescript
const isValid = isValidPassword('Password123');
```

#### isValidURL
Проверка URL.
```typescript
const isValid = isValidURL('https://example.com');
```

#### isValidINN
Проверка ИНН.
```typescript
const isValid = isValidINN('1234567890');
```

#### isValidSNILS
Проверка СНИЛС.
```typescript
const isValid = isValidSNILS('123-456-789 01');
```

#### isValidIP
Проверка IP-адреса.
```typescript
const isValid = isValidIP('192.168.1.1');
```

#### isValidMAC
Проверка MAC-адреса.
```typescript
const isValid = isValidMAC('00:1A:2B:3C:4D:5E');
```

#### isValidDate
Проверка даты.
```typescript
const isValid = isValidDate('2024-03-20');
```

#### isValidAge
Проверка возраста.
```typescript
const isValid = isValidAge('2000-01-01', 18);
```

#### isValidFileSize
Проверка размера файла.
```typescript
const isValid = isValidFileSize(file, 5); // 5 МБ
```

#### isValidFileType
Проверка типа файла.
```typescript
const isValid = isValidFileType(file, ['image/jpeg', 'image/png']);
```

#### isValidFileExtension
Проверка расширения файла.
```typescript
const isValid = isValidFileExtension('document.pdf', ['pdf', 'doc', 'docx']);
``` 
