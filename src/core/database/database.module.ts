// src/core/database/database.module.ts
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './data-source';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const dataSourceProvider: Provider = {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource(dataSourceOptions);
        return await dataSource.initialize();
      },
    };

    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => ({
            ...dataSourceOptions,
            autoLoadEntities: true,
          }),
        }),
      ],
      providers: [dataSourceProvider],
      exports: [dataSourceProvider, TypeOrmModule],
    };
  }
}