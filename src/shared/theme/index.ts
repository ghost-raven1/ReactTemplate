import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#1890ff',
    secondary: '#52c41a',
    error: '#f5222d',
    warning: '#faad14',
    success: '#52c41a',
    background: '#f0f2f5',
    text: '#000000d9',
    textSecondary: '#00000073',
    border: '#d9d9d9',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '2px',
    md: '4px',
    lg: '8px',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px',
    },
  },
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
}; 