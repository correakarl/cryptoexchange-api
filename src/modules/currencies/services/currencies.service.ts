import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from '../entities/currency.entity';
import { CreateCurrencyDto } from '../dto/create-currency.dto';
import { UpdateCurrencyDto } from '../dto/update-currency.dto';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) {}

  async create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
    const currency = this.currencyRepository.create(createCurrencyDto);
    return await this.currencyRepository.save(currency);
  }

  async findAll(): Promise<Currency[]> {
    return await this.currencyRepository.find();
  }

  async findOne(id: string): Promise<Currency> {
    const currency = await this.currencyRepository.findOne({ where: { id } });
    if (!currency) {
      throw new NotFoundException(`Currency with ID ${id} not found`);
    }
    return currency;
  }

  async update(id: string, updateCurrencyDto: UpdateCurrencyDto): Promise<Currency> {
    const currency = await this.findOne(id);
    this.currencyRepository.merge(currency, updateCurrencyDto);
    return await this.currencyRepository.save(currency);
  }

  async remove(id: string): Promise<void> {
    const result = await this.currencyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Currency with ID ${id} not found`);
    }
  }
}