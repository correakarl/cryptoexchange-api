// src/modules/currencies/currencies.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesService } from './services/currencies.service';
import { CurrenciesController } from './controllers/currencies.controller';
import { Currency } from './entities/currency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
  exports: [TypeOrmModule,CurrenciesService], // ¡Asegúrate de exportar el servicio!
})
export class CurrenciesModule {}