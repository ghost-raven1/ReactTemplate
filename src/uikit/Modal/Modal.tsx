import React from 'react';
import styled from 'styled-components';
import { Modal as AntModal } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';

export interface ModalProps extends AntModalProps {
  fullWidth?: boolean;
  centered?: boolean;
}

const StyledModal = styled(AntModal)<ModalProps>`
  ${({ fullWidth }) =>
    fullWidth &&
    `
    .ant-modal {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0;
      top: 0;
      padding-bottom: 0;
      height: 100%;
    }
    .ant-modal-content {
      height: 100%;
      border-radius: 0;
    }
  `}

  ${({ centered }) =>
    centered &&
    `
    .ant-modal {
      top: 50%;
      transform: translateY(-50%);
    }
  `}

  .ant-modal-header {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing.md};
  }

  .ant-modal-body {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  .ant-modal-footer {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return <StyledModal {...props}>{children}</StyledModal>;
}; 