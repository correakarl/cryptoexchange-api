// src/modules/cryptocurrencies/dto/create-cryptocurrency.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateCryptocurrencyDto {
  @ApiProperty({
    example: 'BTC',
    description: 'Código único de la criptomoneda (3-10 caracteres)',
    minLength: 3,
    maxLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: 'Bitcoin',
    description: 'Nombre completo de la criptomoneda',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 50000.42,
    description: 'Precio actual en la moneda asociada',
    minimum: 0.00000001,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  currentPrice: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID de la moneda fiduciaria asociada (UUID)',
  })
  @IsNotEmpty()
  @IsUUID()
  currencyId: string;
}