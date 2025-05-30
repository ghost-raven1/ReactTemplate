import { useState, useEffect } from 'react';

export type Environment = {
  name: string;
  baseUrl: string;
};

const environments: Environment[] = [
  { name: 'Development', baseUrl: 'http://localhost:3000' },
  { name: 'Staging', baseUrl: 'https://staging-api.example.com' },
  { name: 'Production', baseUrl: 'https://api.example.com' },
];

export const useEnvironment = () => {
  const [currentEnv, setCurrentEnv] = useState<Environment>(() => {
    const saved = localStorage.getItem('currentEnvironment');
    return saved ? JSON.parse(saved) : environments[0];
  });

  useEffect(() => {
    localStorage.setItem('currentEnvironment', JSON.stringify(currentEnv));
  }, [currentEnv]);

  const changeEnvironment = (env: Environment) => {
    setCurrentEnv(env);
  };

  return {
    currentEnv,
    environments,
    changeEnvironment,
  };
}; 