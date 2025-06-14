// src/core/database/data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.resolve(__dirname, '../../../.env') });

const configService = new ConfigService();

// Validación del tipo de base de datos
const getValidDatabaseType = (): any => {
  const dbType = configService.get<string>('DB_TYPE', '').toLowerCase();
  console.log('Database type:',dbType)
  const validDrivers = [
    'aurora-mysql', 'aurora-postgres', 'better-sqlite3', 'capacitor', 
    'cockroachdb', 'cordova', 'expo', 'mariadb', 'mongodb', 'mssql', 
    'mysql', 'nativescript', 'oracle', 'postgres', 'react-native', 
    'sap', 'sqlite', 'sqljs', 'spanner'
  ];

  if (!validDrivers.includes(dbType)) {
    throw new Error(`Invalid database type: ${dbType}. Valid types are: ${validDrivers.join(', ')}`);
  }

  return dbType;
};

const baseConfig: Partial<DataSourceOptions> = {
  type: getValidDatabaseType(),
  entities: [path.join(__dirname, '/../../**/*.entity{.ts,.js}')],
  synchronize: configService.get<string>('DB_SYNCHRONIZE', 'true') === 'true',
  logging: configService.get<string>('DB_LOGGING', 'false') === 'false',
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
  migrationsTableName: 'typeorm_migrations',
};

// Configuración específica para SQLite
if (baseConfig.type === 'sqlite') {
  Object.assign(baseConfig, {
    database: configService.get<string>('DB_NAME', './data/dev.db'),
    // Configuraciones específicas para SQLite
    extra: {
      // Timeout extendido para operaciones (30 segundos)
      busyTimeout: 30000,
      // Modo WAL (Write-Ahead Logging) para mejor concurrencia
      mode: 'WAL',
      // Habilitar el modo de sincronización NORMAL
      synchronous: 'NORMAL',
      // Deshabilitar el modo de bloqueo exclusivo
      journalMode: 'WAL',
      // Tamaño de caché (en páginas SQLite)
      cacheSize: -2000, // ~2MB
      // Deshabilitar el conteo de cambios para mejor performance
      changeCount: 0,
      // Habilitar foreign keys
      foreignKeys: true,
    },
  });
} else {
  // Configuración para otros tipos de bases de datos
  Object.assign(baseConfig, {
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT', '5432'), 10),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    // Configuración de pool para bases de datos no-SQLite
    extra: {
      connectionLimit: 10, // Tamaño del pool de conexiones
    },
  });
}

export const dataSourceOptions: DataSourceOptions = baseConfig as DataSourceOptions;

// Inicialización del DataSource con manejo de errores
const dataSource = new DataSource(dataSourceOptions);

// Función para inicializar con reintentos
async function initializeDataSource() {
  const maxRetries = 3;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      await dataSource.initialize();
      console.log('Data Source has been initialized!');
      return dataSource;
    } catch (err) {
      retryCount++;
      console.error(`Error during Data Source initialization (Attempt ${retryCount}):`, err);
      
      if (retryCount === maxRetries) {
        throw err;
      }
      
      // Esperar antes de reintentar
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

export default initializeDataSource();