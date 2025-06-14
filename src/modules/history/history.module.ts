// src/modules/history/history.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { HistoryService } from './services/history.service';
import { CurrencyHistory } from './entities/currency-history.entity';
import { CryptocurrencyHistory } from './entities/cryptocurrency-history.entity';
import { Currency } from '../currencies/entities/currency.entity';
import { Cryptocurrency } from '../cryptocurrencies/entities/cryptocurrency.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CurrencyHistory,
      CryptocurrencyHistory,
      Currency,       // Añadimos las entidades transaccionales
      Cryptocurrency  // Añadimos las entidades transaccionales
    ]),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
  ],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}