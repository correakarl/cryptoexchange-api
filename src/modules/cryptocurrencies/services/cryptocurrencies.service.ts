// src/modules/cryptocurrencies/services/cryptocurrencies.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cryptocurrency } from '../entities/cryptocurrency.entity';
import { CreateCryptocurrencyDto } from '../dto/create-cryptocurrency.dto';
import { UpdateCryptocurrencyDto } from '../dto/update-cryptocurrency.dto';
import { CurrenciesService } from '../../currencies/services/currencies.service';

@Injectable()
export class CryptocurrenciesService {
  constructor(
    @InjectRepository(Cryptocurrency)
    private readonly cryptoRepository: Repository<Cryptocurrency>,
    private readonly currenciesService: CurrenciesService, // Inyectamos el servicio en lugar del repositorio
  ) {}

  async create(
    createCryptoDto: CreateCryptocurrencyDto,
  ): Promise<Cryptocurrency> {
    // Verificar que la moneda exista usando el servicio de currencies
    const currency = await this.currenciesService.findOne(
      createCryptoDto.currencyId,
    );

    if (!currency) {
      throw new NotFoundException(
        `Currency with ID ${createCryptoDto.currencyId} not found`,
      );
    }

    const crypto = this.cryptoRepository.create({
      ...createCryptoDto,
      currency,
    });

    return await this.cryptoRepository.save(crypto);
  }

  async findAll(currencyCode?: string): Promise<Cryptocurrency[]> {
    const query = this.cryptoRepository
      .createQueryBuilder('crypto')
      .leftJoinAndSelect('crypto.currency', 'currency');

    if (currencyCode) {
      query.where('currency.code = :code', { code: currencyCode });
    }

    return await query.getMany();
  }

  async findAllByCurrency(currencyCode: string): Promise<Cryptocurrency[]> {
    return this.cryptoRepository
      .createQueryBuilder('crypto')
      .leftJoinAndSelect('crypto.currency', 'currency')
      .where('currency.code = :code', { code: currencyCode })
      .getMany();
  }

  async findOne(id: string): Promise<Cryptocurrency> {
    const crypto = await this.cryptoRepository.findOne({
      where: { id },
      relations: ['currency'],
    });

    if (!crypto) {
      throw new NotFoundException(`Cryptocurrency with ID ${id} not found`);
    }

    return crypto;
  }

  async update(
    id: string,
    updateCryptoDto: UpdateCryptocurrencyDto,
  ): Promise<Cryptocurrency> {
    const crypto = await this.findOne(id);

    if (updateCryptoDto.currencyId) {
      const currency = await this.currenciesService.findOne(
        updateCryptoDto.currencyId,
      );
      crypto.currency = currency;
    }

    Object.assign(crypto, updateCryptoDto);
    return await this.cryptoRepository.save(crypto);
  }

  async remove(id: string): Promise<void> {
    const result = await this.cryptoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Cryptocurrency with ID ${id} not found`);
    }
  }
}
