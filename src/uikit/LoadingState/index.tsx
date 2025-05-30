import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  width: 100%;
`;

const StyledSpin = styled(Spin)`
  margin-bottom: 16px;
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  padding: 16px;
  
  .react-loading-skeleton {
    background-color: #f0f0f0;
    background-image: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 37%,
      #f0f0f0 63%
    );
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

interface LoadingStateProps {
  type?: 'spinner' | 'skeleton';
  rows?: number;
  active?: boolean;
  height?: number;
  width?: string | number;
  circle?: boolean;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  type = 'spinner',
  rows = 3,
  active = true,
  height,
  width,
  circle = false,
  className,
}) => {
  if (type === 'skeleton') {
    return (
      <SkeletonWrapper className={className}>
        {Array(rows)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              height={height}
              width={width}
              circle={circle}
              style={{ marginBottom: index === rows - 1 ? 0 : 16 }}
            />
          ))}
      </SkeletonWrapper>
    );
  }

  return (
    <LoadingWrapper>
      <StyledSpin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </LoadingWrapper>
  );
}; 