# Руководство по внесению изменений

Спасибо за интерес к нашему проекту! Мы приветствуем вклад от сообщества.

## Процесс внесения изменений

1. **Форкните репозиторий**
   - Нажмите кнопку "Fork" в правом верхнем углу страницы репозитория

2. **Клонируйте ваш форк**
   ```bash
   git clone https://github.com/YOUR-USERNAME/my-antd-app.git
   cd my-antd-app
   ```

3. **Создайте новую ветку**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Установите зависимости**
   ```bash
   npm install
   ```

5. **Внесите изменения**
   - Следуйте стилю кода проекта
   - Добавьте тесты для новых функций
   - Обновите документацию при необходимости

6. **Запустите тесты**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

7. **Зафиксируйте изменения**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

8. **Отправьте изменения**
   ```bash
   git push origin feature/your-feature-name
   ```

9. **Создайте Pull Request**
   - Перейдите на GitHub
   - Нажмите "New Pull Request"
   - Выберите вашу ветку
   - Заполните шаблон PR

## Правила коммитов

Мы используем [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - новая функциональность
- `fix:` - исправление ошибок
- `docs:` - изменения в документации
- `style:` - форматирование, отступы и т.д.
- `refactor:` - рефакторинг кода
- `test:` - добавление тестов
- `chore:` - обновление зависимостей и т.д.

## Стиль кода

- Используйте TypeScript
- Следуйте правилам ESLint
- Используйте Prettier для форматирования
- Пишите тесты для нового кода
- Документируйте публичные API

## Процесс ревью

1. Все PR должны быть проверены как минимум одним ревьюером
2. Все тесты должны проходить
3. Код должен соответствовать стилю проекта
4. Документация должна быть обновлена

## Вопросы?

Если у вас есть вопросы, создайте Issue в репозитории. 