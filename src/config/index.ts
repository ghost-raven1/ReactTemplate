interface Config {
  api: {
    baseUrl: string;
    timeout: number;
  };
  auth: {
    tokenKey: string;
    refreshTokenKey: string;
    loginPath: string;
  };
}

const config: Config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    loginPath: '/login',
  },
};

export default config; 