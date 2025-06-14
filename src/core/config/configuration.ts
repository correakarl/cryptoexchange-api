// src/core/config/configuration.ts
import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  app: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    globalPrefix: process.env.GLOBAL_PREFIX || 'api',
    apiPrefix: process.env.API_PREFIX || 'v1',
  },
  swagger: {
    enabled: process.env.SWAGGER_ENABLED === 'true',
    path: process.env.SWAGGER_PATH || 'docs',
    title: process.env.SWAGGER_TITLE || 'Crypto Trading API',
    description: process.env.SWAGGER_DESCRIPTION || 'API for cryptocurrency trading platform',
    version: process.env.SWAGGER_VERSION || '1.0',
  },
  database: {
    type: process.env.DB_TYPE || '',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME || '',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret-key',
    expiresIn: process.env.JWT_EXPIRATION_TIME || '3600s',
  },
}));