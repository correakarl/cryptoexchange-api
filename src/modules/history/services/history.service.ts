// src/modules/history/services/history.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { Currency } from '../../currencies/entities/currency.entity';
import { Cryptocurrency } from '../../cryptocurrencies/entities/cryptocurrency.entity';
import { CurrencyHistory } from '../entities/currency-history.entity';
import { CryptocurrencyHistory } from '../entities/cryptocurrency-history.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name);
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
    @InjectRepository(Cryptocurrency)
    private readonly cryptocurrencyRepository: Repository<Cryptocurrency>,
    @InjectRepository(CurrencyHistory)
    private readonly currencyHistoryRepository: Repository<CurrencyHistory>,
    @InjectRepository(CryptocurrencyHistory)
    private readonly cryptocurrencyHistoryRepository: Repository<CryptocurrencyHistory>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly configService: ConfigService,
  ) {}

  @Cron(process.env.HISTORY_REPLICATION_CRON || '0 0 * * *') // Se ejecuta diariamente a medianoche
  async handleDataReplication() {
    this.logger.log('Iniciando replicación de datos históricos...');

    try {
      await this.replicateCurrencies();
      await this.replicateCryptocurrencies();
      await this.cleanOldData();

      this.logger.log('Replicación de datos históricos completada');
    } catch (error) {
      this.logger.error('Error en replicación histórica', error.stack);
    }
  }

  private async replicateCurrencies(): Promise<void> {
    // 1. Cerrar registros históricos previos
    await this.currencyHistoryRepository
      .createQueryBuilder()
      .update(CurrencyHistory)
      .set({ validTo: new Date() })
      .where('validTo IS NULL')
      .execute();

    // 2. Replicar datos actuales
    const currencies = await this.currencyRepository.find();
    const historyRecords = currencies.map((currency) => ({
      originalId: currency.id,
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol,
      validFrom: new Date(),
    }));

    await this.currencyHistoryRepository.insert(historyRecords);
  }

  private async replicateCryptocurrencies(): Promise<void> {
    // 1. Cerrar registros históricos previos
    await this.cryptocurrencyHistoryRepository
      .createQueryBuilder()
      .update(CryptocurrencyHistory)
      .set({ validTo: new Date() })
      .where('validTo IS NULL')
      .execute();

    // 2. Replicar datos actuales con joins para obtener info de moneda
    const cryptocurrencies = await this.cryptocurrencyRepository
      .createQueryBuilder('crypto')
      .leftJoinAndSelect('crypto.currency', 'currency')
      .getMany();

    const historyRecords = cryptocurrencies.map((crypto) => ({
      originalId: crypto.id,
      code: crypto.code,
      name: crypto.name,
      currentPrice: crypto.currentPrice,
      currencyId: crypto.currency.id,
      currencyCode: crypto.currency.code,
      validFrom: new Date(),
    }));

    await this.cryptocurrencyHistoryRepository.insert(historyRecords);
  }

  private async cleanOldData(): Promise<void> {
    // Limpiar datos transaccionales antiguos (opcional según requerimientos)
    // Ejemplo: eliminar registros con más de 30 días
    const retentionDays = parseInt(process.env.HISTORY_RETENTION_DAYS || '30');
    const retentionPeriod = new Date();
    retentionPeriod.setDate(retentionPeriod.getDate() - retentionDays);

    await this.currencyRepository
      .createQueryBuilder()
      .delete()
      .where('createdAt < :retentionPeriod', { retentionPeriod })
      .execute();

    await this.cryptocurrencyRepository
      .createQueryBuilder()
      .delete()
      .where('createdAt < :retentionPeriod', { retentionPeriod })
      .execute();
  }
}
