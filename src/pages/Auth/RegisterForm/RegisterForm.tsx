import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useAuth } from '../../../shared/hooks/useAuth';

const FormWrapper = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 32px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 32px;
  color: #fff;
  font-size: 28px;
  font-weight: 500;
`;

const StyledForm = styled(Form as any)`
  .ant-form-item {
    margin-bottom: 24px;
  }

  .ant-input-affix-wrapper {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px;
    color: #fff;
    transition: all 0.3s ease;

    &:hover, &:focus {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .anticon {
      color: rgba(255, 255, 255, 0.5);
    }

    input {
      background: transparent;
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }

  .ant-input-password {
    .ant-input {
      background: transparent;
    }
  }

  .ant-form-item-explain-error {
    color: #ff4d4f;
    font-size: 13px;
    margin-top: 4px;
  }
`;

const StyledButton = styled(Button)`
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
  background: #1890ff;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    background: #40a9ff;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;

  a {
    color: #1890ff;
    margin-left: 4px;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #40a9ff;
    }
  }
`;

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: RegisterFormData) => {
    try {
      setLoading(true);
      const result = await register(values.email, values.password, values.name);
      
      if (result.success) {
        message.success('Регистрация успешна!');
        navigate('/');
      } else {
        message.error(result.error || 'Ошибка регистрации');
      }
    } catch (error) {
      message.error('Произошла ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper>
      <Title>Регистрация</Title>
      <Form
        name="register"
        onFinish={onFinish}
        size="large"
        className={StyledForm.styledComponentId}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Имя" 
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите email!' },
            { type: 'email', message: 'Введите корректный email!' }
          ]}
        >
          <Input 
            prefix={<MailOutlined />} 
            placeholder="Email" 
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите пароль!' },
            { min: 6, message: 'Пароль должен быть не менее 6 символов!' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Пожалуйста, подтвердите пароль!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают!'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Подтвердите пароль"
          />
        </Form.Item>

        <Form.Item>
          <StyledButton 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            block
          >
            Зарегистрироваться
          </StyledButton>
        </Form.Item>
      </Form>
      <LoginLink>
        Уже есть аккаунт?<a onClick={() => navigate('/login')}>Войти</a>
      </LoginLink>
    </FormWrapper>
  );
};
