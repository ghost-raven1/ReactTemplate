import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLogger } from '../shared/hooks/useLogger';
import dayjs from 'dayjs';
import { z } from 'zod';
import * as yup from 'yup';

const Container = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 8px;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 4px;
`;

// Zod schema
const zodSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое'),
  date: z.custom((val) => dayjs(val, 'YYYY-MM-DD', true).isValid(), {
    message: 'Некорректная дата',
  }),
});

// Yup schema
const yupSchema = yup.object().shape({
  name: yup.string().min(2, 'Имя слишком короткое').required('Имя обязательно'),
  date: yup
    .string()
    .test('is-dayjs', 'Некорректная дата', (value) => dayjs(value, 'YYYY-MM-DD', true).isValid())
    .required('Дата обязательна'),
});

export const Example: React.FC = () => {
  const logger = useLogger('Example');
  const [form, setForm] = useState({ name: '', date: '' });
  const [zodError, setZodError] = useState<string | null>(null);
  const [yupError, setYupError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    logger.info('Component mounted', { timestamp: Date.now() }, ['lifecycle']);
  }, [logger]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setZodError(null);
    setYupError(null);
    setSuccess(null);
  };

  const handleValidate = async () => {
    setZodError(null);
    setYupError(null);
    setSuccess(null);
    // Zod validation
    const zodResult = zodSchema.safeParse(form);
    if (!zodResult.success) {
      setZodError(zodResult.error.errors[0]?.message || 'Ошибка валидации');
      return;
    }
    // Yup validation
    try {
      await yupSchema.validate(form);
      setSuccess('Валидация успешна!');
    } catch (err: any) {
      setYupError(err.message);
    }
  };

  return (
    <Container>
      <h1>Logger Example</h1>
      <p>Click the buttons below to generate different types of logs.</p>
      <div>
        <Button onClick={() => logger.debug('Debug message')}>Debug</Button>
        <Button onClick={() => logger.info('Info message')}>Info</Button>
        <Button onClick={() => logger.warn('Warning message')}>Warn</Button>
        <Button onClick={() => logger.error('Error message')}>Error</Button>
      </div>
      <hr style={{ margin: '32px 0' }} />
      <h2>Форма с датой (dayjs + zod/yup)</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleValidate().then();
        }}
        style={{ maxWidth: 320 }}
      >
        <div>
          <label>
            Имя:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: 8 }}
            />
          </label>
        </div>
        <div>
          <label>
            Дата (YYYY-MM-DD):
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              style={{ width: '100%', marginBottom: 8 }}
            />
          </label>
        </div>
        <Button type="submit">Проверить</Button>
        {zodError && <Error>Zod: {zodError}</Error>}
        {yupError && <Error>Yup: {yupError}</Error>}
        {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
      </form>
    </Container>
  );
};
