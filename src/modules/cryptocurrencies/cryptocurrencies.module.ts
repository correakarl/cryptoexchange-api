// src/modules/cryptocurrencies/cryptocurrencies.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptocurrenciesService } from './services/cryptocurrencies.service';
import { CryptocurrenciesController } from './controllers/cryptocurrencies.controller';
import { Cryptocurrency } from './entities/cryptocurrency.entity';
import { CurrenciesModule } from '../currencies/currencies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cryptocurrency]),
    CurrenciesModule, // Importa el módulo que contiene el servicio
  ],
  controllers: [CryptocurrenciesController],
  providers: [CryptocurrenciesService],
  exports: [TypeOrmModule,CryptocurrenciesService],
})
export class CryptocurrenciesModule {}