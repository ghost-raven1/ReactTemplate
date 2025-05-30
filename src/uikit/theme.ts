export const theme = {
  colors: {
    primary: '#1890ff',
    secondary: '#52c41a',
    error: '#ff4d4f',
    warning: '#faad14',
    success: '#52c41a',
    info: '#1890ff',
    border: '#d9d9d9',
    background: '#ffffff',
    text: 'rgba(0, 0, 0, 0.85)',
    textSecondary: 'rgba(0, 0, 0, 0.45)',
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
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    default: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
    fast: 'all 0.15s cubic-bezier(0.645, 0.045, 0.355, 1)',
    slow: 'all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)',
  },
} as const;

export type Theme = typeof theme; 