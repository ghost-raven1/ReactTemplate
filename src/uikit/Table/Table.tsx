import React from 'react';
import { Table as AntTable } from 'antd';
import type { TableProps as AntTableProps } from 'antd';
import styled from 'styled-components';

export interface TableProps<T> extends AntTableProps<T> {
  className?: string;
}

const StyledTable = styled(AntTable)`
  .ant-table-thead > tr > th {
    background: #fafafa;
    font-weight: 600;
  }
  
  .ant-table-tbody > tr:hover > td {
    background: #f5f5f5;
  }
`;

export const Table = <T extends object>({ className = '', ...props }: TableProps<T>) => {
  return <StyledTable className={className} {...props} />;
}; 