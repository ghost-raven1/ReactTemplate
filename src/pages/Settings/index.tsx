import React from 'react';
import styled from 'styled-components';
import { Card } from '../../uikit/Card';
import { PageTitle } from '../../uikit/PageTitle';
import { PageDescription } from '../../uikit/PageDescription';

const SettingsContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SettingsSection = styled.div`
  margin-bottom: 32px;
`;

const SettingCard = styled(Card)`
  padding: 20px;
  margin-bottom: 16px;
`;

const SettingTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 12px;
`;

const SettingDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
`;

const SettingOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const OptionLabel = styled.span`
  color: #fff;
  font-size: 14px;
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.1);
    transition: .4s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #2196F3;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;

export const Settings: React.FC = () => {
  return (
    <SettingsContainer>
      <PageTitle>Настройки</PageTitle>
      <PageDescription>
        Настройте параметры вашего аккаунта и приложения
      </PageDescription>

      <SettingsSection>
        <SettingCard>
          <SettingTitle>Уведомления</SettingTitle>
          <SettingDescription>
            Управляйте настройками уведомлений
          </SettingDescription>
          <SettingOption>
            <OptionLabel>Email уведомления</OptionLabel>
            <Toggle>
              <input type="checkbox" defaultChecked />
              <span></span>
            </Toggle>
          </SettingOption>
          <SettingOption>
            <OptionLabel>Push уведомления</OptionLabel>
            <Toggle>
              <input type="checkbox" defaultChecked />
              <span></span>
            </Toggle>
          </SettingOption>
          <SettingOption>
            <OptionLabel>Новости и обновления</OptionLabel>
            <Toggle>
              <input type="checkbox" />
              <span></span>
            </Toggle>
          </SettingOption>
        </SettingCard>
      </SettingsSection>

      <SettingsSection>
        <SettingCard>
          <SettingTitle>Безопасность</SettingTitle>
          <SettingDescription>
            Настройки безопасности вашего аккаунта
          </SettingDescription>
          <SettingOption>
            <OptionLabel>Двухфакторная аутентификация</OptionLabel>
            <Toggle>
              <input type="checkbox" />
              <span></span>
            </Toggle>
          </SettingOption>
          <SettingOption>
            <OptionLabel>Вход по биометрии</OptionLabel>
            <Toggle>
              <input type="checkbox" />
              <span></span>
            </Toggle>
          </SettingOption>
        </SettingCard>
      </SettingsSection>

      <SettingsSection>
        <SettingCard>
          <SettingTitle>Внешний вид</SettingTitle>
          <SettingDescription>
            Настройки отображения интерфейса
          </SettingDescription>
          <SettingOption>
            <OptionLabel>Темная тема</OptionLabel>
            <Toggle>
              <input type="checkbox" defaultChecked />
              <span></span>
            </Toggle>
          </SettingOption>
          <SettingOption>
            <OptionLabel>Компактный режим</OptionLabel>
            <Toggle>
              <input type="checkbox" />
              <span></span>
            </Toggle>
          </SettingOption>
        </SettingCard>
      </SettingsSection>
    </SettingsContainer>
  );
}; 