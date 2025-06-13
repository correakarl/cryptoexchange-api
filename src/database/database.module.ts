import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        try {
          if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
          }
          return {
            ...AppDataSource.options,
            autoLoadEntities: true,
          };
        } catch (error) {
          console.error('Error initializing data source:', error);
          throw error;
        }
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}