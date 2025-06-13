import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import dataSource, { dataSourceOptions } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        ...dataSourceOptions,
        entities: [
          ...dataSourceOptions.entities as [], // Mantén las entidades existentes
        ],
      }),
      dataSourceFactory: async () => {
        await dataSource.initialize();
        return dataSource;
      },
    }),
  ],
  exports: [TypeOrmModule], // Exporta para que otros módulos puedan usar las entidades
})
export class DatabaseModule { }