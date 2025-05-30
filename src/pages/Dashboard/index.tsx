import React from 'react';
import styled from 'styled-components';
import { StatCard } from '../../uikit/StatCard';
import { Card } from '../../uikit/Card';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, LineChartOutlined } from '@ant-design/icons';

const DashboardContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(Card)`
  min-height: 300px;
`;

export const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <StatsGrid>
        <StatCard
          title="Total Users"
          value="1,234"
          icon={<UserOutlined />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Orders"
          value="456"
          icon={<ShoppingCartOutlined />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Revenue"
          value="$12,345"
          icon={<DollarOutlined />}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          icon={<LineChartOutlined />}
          trend={{ value: 2, isPositive: true }}
        />
      </StatsGrid>

      <ChartsGrid>
        <ChartCard title="Sales Overview">
          {/* Here you can add a chart component */}
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.5)' }}>
            Chart Component Placeholder
          </div>
        </ChartCard>
        <ChartCard title="Recent Activity">
          {/* Here you can add a list of recent activities */}
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255, 255, 255, 0.5)' }}>
            Activity List Placeholder
          </div>
        </ChartCard>
      </ChartsGrid>
    </DashboardContainer>
  );
}; 