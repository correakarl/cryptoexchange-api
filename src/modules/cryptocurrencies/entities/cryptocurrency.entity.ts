// src/modules/cryptocurrencies/entities/cryptocurrency.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Currency } from '../../currencies/entities/currency.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cryptocurrency {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID único de la criptomoneda',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Código único de la criptomoneda (ej: BTC, ETH)',
    example: 'BTC',
  })
  code: string;

  @Column()
  @ApiProperty({
    description: 'Nombre completo de la criptomoneda',
    example: 'Bitcoin',
  })
  name: string;

  @Column('decimal', { precision: 18, scale: 8 })
  @ApiProperty({
    description: 'Precio actual en la moneda asociada',
    example: 50234.56,
  })
  currentPrice: number;

  @ManyToOne(() => Currency, (currency) => currency.cryptocurrencies)
  @JoinColumn({ name: 'currencyId' })
  @ApiProperty({
    description: 'Moneda fiduciaria asociada',
    type: () => Currency,
  })
  currency: Currency;

  @Column()
  @ApiProperty({
    description: 'ID de la moneda fiduciaria asociada',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  currencyId: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Fecha de creación del registro',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Fecha de última actualización',
  })
  updatedAt: Date;
}