import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';

config();

const configService = new ConfigService();

// Configuración base común para todos los tipos de DB
const baseConfig: Partial<DataSourceOptions> = {
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  synchronize: configService.get<string>('NODE_ENV') !== 'production',
  logging: configService.get<string>('NODE_ENV') === 'development',
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
  migrationsTableName: 'typeorm_migrations',
};

// Configuración específica por tipo de base de datos
const getDatabaseConfig = (): DataSourceOptions => {
  const dbType = configService.get<string>('DB_TYPE', 'sqlite').toLowerCase();

  switch (dbType) {
    case 'postgres':
      return {
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_NAME', 'ecommerce_kc'),
        ...baseConfig,
      } as DataSourceOptions;

    case 'mysql':
    case 'mariadb':
      return {
        type: dbType as 'mysql' | 'mariadb',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'root'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_NAME', 'ecommerce_kc'),
        ...baseConfig,
      } as DataSourceOptions;

    case 'mssql':
      return {
        type: 'mssql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 1433),
        username: configService.get<string>('DB_USERNAME', 'sa'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_NAME', 'ecommerce_kc'),
        options: {
          encrypt: true, // para Azure
          trustServerCertificate: true, // opcional
        },
        ...baseConfig,
      } as DataSourceOptions;

    case 'oracle':
      return {
        type: 'oracle',
        connectString: configService.get<string>('DB_CONNECT_STRING', 'localhost/XE'),
        username: configService.get<string>('DB_USERNAME', 'system'),
        password: configService.get<string>('DB_PASSWORD', 'oracle'),
        ...baseConfig,
      } as DataSourceOptions;

    case 'sqlserver':
      return {
        type: 'sqlserver',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 1433),
        username: configService.get<string>('DB_USERNAME', 'sa'),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_NAME', 'ecommerce_kc'),
        ...baseConfig,
      } as DataSourceOptions;

    case 'mongodb':
      return {
        type: 'mongodb',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 27017),
        username: configService.get<string>('DB_USERNAME', ''),
        password: configService.get<string>('DB_PASSWORD', ''),
        database: configService.get<string>('DB_NAME', 'ecommerce_kc'),
        ...baseConfig,
      } as DataSourceOptions;


    case 'sqlite':
    default:
      return {
        type: 'sqlite',
        database: configService.get<string>('DB_PATH', './ecommerce.db'),
        ...baseConfig,
      } as DataSourceOptions;
  }
};

export const dataSourceOptions: DataSourceOptions = getDatabaseConfig();

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;