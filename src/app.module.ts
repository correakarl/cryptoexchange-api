import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
// import { CurrencyModule } from './currency/currency.module';
// import { CryptoModule } from './cryptocurrency/crypto.module';
// import { HistoricalModule } from './historical/historical.module';
import {DatabaseModule}  from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    // TypeOrmModule.forRoot(typeOrmConfig()),
    // AuthModule,
    // CurrencyModule,
    // CryptoModule,
    // HistoricalModule,
  ],
})
export class AppModule {}