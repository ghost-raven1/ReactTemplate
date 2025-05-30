import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useAuthStore } from '../../../store/useAuthStore';
import { ROUTES } from '../../../routes/config';

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

interface LoginFormData {
  email: string;
  password: string;
}

const StyledFormWrapper = styled.div`
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

const RegisterLink = styled.div`
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

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || ROUTES.HOME;
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const onFinish = async (values: LoginFormData) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
      message.success('Успешный вход!');
      const from = (location.state as any)?.from?.pathname || ROUTES.HOME;
      navigate(from, { replace: true });
    } catch (error) {
      message.error('Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper>
      <Title>Вход в систему</Title>
      <StyledFormWrapper>
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите email!' },
              { type: 'email', message: 'Введите корректный email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
            />
          </Form.Item>

          <Form.Item>
            <StyledButton 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
            >
              Войти
            </StyledButton>
          </Form.Item>
        </Form>
      </StyledFormWrapper>
      <RegisterLink>
        Нет аккаунта?<a onClick={() => navigate(ROUTES.REGISTER)}>Зарегистрироваться</a>
      </RegisterLink>
    </FormWrapper>
  );
};
