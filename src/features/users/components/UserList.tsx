import React from 'react';
import { List, Avatar, Typography, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { LoadingState } from '../../../uikit/LoadingState';
import type { User } from '../../../types';

const { Title } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface UserListProps {
  users: User[];
  loading: boolean;
}

export const UserList: React.FC<UserListProps> = ({ users, loading }) => {
  if (loading) {
    return (
      <div>
        <Title level={4}>Users</Title>
        <LoadingState
          type="skeleton"
          rows={5}
          height={80}
          width="100%"
        />
      </div>
    );
  }

  return (
    <div>
      <Title level={4}>Users</Title>
      <List
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <StyledCard>
              <UserInfo>
                <Avatar icon={<UserOutlined />} />
                <div>
                  <Title level={5}>{user.email}</Title>
                  <Typography.Text type="secondary">
                    ID: {user.id}
                  </Typography.Text>
                </div>
              </UserInfo>
            </StyledCard>
          </List.Item>
        )}
      />
    </div>
  );
}; 