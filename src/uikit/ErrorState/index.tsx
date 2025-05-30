import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  width: 100%;
`;

interface ErrorStateProps {
  title?: string;
  subTitle?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  subTitle,
  onRetry,
}) => {
  const { t } = useTranslation();

  return (
    <ErrorWrapper>
      <Result
        status="error"
        title={title || t('errors.somethingWentWrong')}
        subTitle={subTitle || t('errors.unknownError')}
        extra={
          onRetry && (
            <Button type="primary" onClick={onRetry}>
              {t('errors.reloadPage')}
            </Button>
          )
        }
      />
    </ErrorWrapper>
  );
}; 