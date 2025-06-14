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
        console.log('Initializing Data Source with options:', dataSourceOptions);
        try {
          const initializedDataSource = await dataSource.initialize();
          console.log('Data Source has been initialized!');
          return initializedDataSource;
        } catch (error) {
          console.error('Error initializing Data Source:', error);
          throw error;
        }
      },
    };

    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            console.log('TypeORM Module loading with options:', {
              ...dataSourceOptions,
              autoLoadEntities: true,
            });
            return {
              ...dataSourceOptions,
              autoLoadEntities: true,
            };
          },
        }),
      ],
      providers: [dataSourceProvider],
      exports: [dataSourceProvider, TypeOrmModule],
    };
  }
}