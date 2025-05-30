import React from 'react';
import styled from 'styled-components';
import { Tooltip as AntTooltip } from 'antd';
import type { TooltipProps as AntTooltipProps } from 'antd';

export interface TooltipProps extends AntTooltipProps {
  type?: 'default' | 'light' | 'dark';
  arrow?: boolean;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'focus' | 'click';
  showDelay?: number;
  hideDelay?: number;
  children?: React.ReactNode;
}

const StyledTooltip = styled(AntTooltip)<TooltipProps>`
  .ant-tooltip-inner {
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: 14px;
    line-height: 1.5;
  }

  ${({ type, theme }) => {
    switch (type) {
      case 'light':
        return `
          .ant-tooltip-inner {
            background-color: ${theme.colors.background};
            color: ${theme.colors.text};
            box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08);
          }
          .ant-tooltip-arrow-content {
            background-color: ${theme.colors.background};
          }
        `;
      case 'dark':
        return `
          .ant-tooltip-inner {
            background-color: ${theme.colors.text};
            color: ${theme.colors.background};
          }
          .ant-tooltip-arrow-content {
            background-color: ${theme.colors.text};
          }
        `;
      default:
        return '';
    }
  }}
`;

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  type = 'default',
  arrow = true,
  placement = 'top',
  trigger = 'hover',
  showDelay = 0,
  hideDelay = 0,
  ...props
}) => {
  return (
    <StyledTooltip
      type={type}
      arrow={arrow}
      placement={placement}
      trigger={trigger}
      mouseEnterDelay={showDelay}
      mouseLeaveDelay={hideDelay}
      {...props}
    >
      {children}
    </StyledTooltip>
  );
}; 