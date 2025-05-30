#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const environment = process.argv[2];

if (!environment) {
  console.error('Please specify environment (staging or production)');
  process.exit(1);
}

const config = {
  staging: {
    host: 'staging.yourdomain.com',
    user: 'deploy',
    path: '/var/www/staging',
  },
  production: {
    host: 'yourdomain.com',
    user: 'deploy',
    path: '/var/www/production',
  },
};

const envConfig = config[environment];

if (!envConfig) {
  console.error('Invalid environment. Use staging or production');
  process.exit(1);
}

try {
  // Проверяем наличие dist директории
  const distPath = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    console.error('Build directory not found. Run npm run build first');
    process.exit(1);
  }

  // Создаем архив
  console.log('Creating archive...');
  execSync('tar -czf dist.tar.gz dist');

  // Загружаем на сервер
  console.log(`Deploying to ${environment}...`);
  execSync(
    `scp dist.tar.gz ${envConfig.user}@${envConfig.host}:${envConfig.path}`
  );

  // Распаковываем на сервере
  console.log('Extracting files...');
  execSync(
    `ssh ${envConfig.user}@${envConfig.host} "cd ${envConfig.path} && tar -xzf dist.tar.gz && rm dist.tar.gz"`
  );

  // Удаляем локальный архив
  fs.unlinkSync('dist.tar.gz');

  console.log('Deployment completed successfully!');
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
} 