import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      error: string;
      warning: string;
      success: string;
      background: string;
      text: string;
      textSecondary: string;
      border: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
    typography: {
      fontFamily: string;
      fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
} 