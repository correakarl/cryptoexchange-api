// src/core/validators/database-config.validator.ts
import { plainToInstance } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

class DatabaseConfig {
  @IsIn([
    'aurora-mysql', 'aurora-postgres', 'better-sqlite3', 'capacitor',
    'cockroachdb', 'cordova', 'expo', 'mariadb', 'mongodb', 'mssql',
    'mysql', 'nativescript', 'oracle', 'postgres', 'react-native',
    'sap', 'sqlite', 'sqljs', 'spanner'
  ])
  DB_TYPE: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsString()
  DB_HOST?: string;

  @IsNumber()
  DB_PORT?: number;

  @IsString()
  DB_USERNAME?: string;

  @IsString()
  DB_PASSWORD?: string;

  @IsString()
  DB_SYNCHRONIZE: string = 'true';

  @IsString()
  DB_LOGGING: string = 'false';
}

export function validateDatabaseConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(DatabaseConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    const missingFields = errors.map(error => error.property);
    throw new Error(
      `Configuración de base de datos inválida. Faltan o son incorrectos los siguientes campos: ${missingFields.join(', ')}`
    );
  }

  // Validación adicional para bases de datos no-SQLite
  if (validatedConfig.DB_TYPE !== 'sqlite') {
    const requiredNonSqliteFields = ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD'];
    const missingNonSqliteFields = requiredNonSqliteFields.filter(
      field => !validatedConfig[field]
    );

    if (missingNonSqliteFields.length > 0) {
      throw new Error(
        `Para bases de datos no-SQLite, los siguientes campos son requeridos: ${missingNonSqliteFields.join(', ')}`
      );
    }
  }

  return validatedConfig;
}