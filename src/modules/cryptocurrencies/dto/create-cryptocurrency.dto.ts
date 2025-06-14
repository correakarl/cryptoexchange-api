import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";


export class CreateCryptocurrencyDto {
  @ApiProperty({ example: 'BTC', description: 'Código de la criptomoneda' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: 'Bitcoin', description: 'Nombre de la criptomoneda' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 50234.56, description: 'Precio actual' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  currentPrice: number;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID de la moneda asociada',
  })
  @IsNotEmpty()
  @IsUUID()
  currencyId: string;
}