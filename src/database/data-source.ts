import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

// Tipos compatibles con TypeORM
type DatabaseType = 'mysql' | 'mariadb' | 'postgres' | 'cockroachdb' | 'sqlite' | 'mssql';

const dbType = (process.env.DB_TYPE as DatabaseType) || 'sqlite';

let dataSourceConfig;

switch (dbType) {
  case 'postgres':
    dataSourceConfig = {
      type: 'postgres' as const,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'crypto_db',
      synchronize: process.env.DB_SYNCHRONIZE !== 'false',
      logging: process.env.DB_LOGGING === 'true',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
    };
    break;

  case 'mysql':
    dataSourceConfig = {
      type: 'mysql' as const,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'crypto_db',
      synchronize: process.env.DB_SYNCHRONIZE !== 'false',
      logging: process.env.DB_LOGGING === 'true',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
    };
    break;

  case 'sqlite':
    dataSourceConfig = {
      type: 'sqlite' as const,
      database: process.env.DB_NAME || './data/dev.db',
      synchronize: process.env.DB_SYNCHRONIZE !== 'false',
      logging: process.env.DB_LOGGING === 'true',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
    };
    break;

  case 'mssql':
    dataSourceConfig = {
      type: 'mssql' as const,
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '1433'),
      username: process.env.DB_USERNAME || 'sa',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'crypto_db',
      synchronize: process.env.DB_SYNCHRONIZE !== 'false',
      logging: process.env.DB_LOGGING === 'true',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
    };
    break;

  default:
    throw new Error(`Unsupported database type: ${dbType}`);
}

export const AppDataSource = new DataSource(dataSourceConfig);