import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateCurrencyDto {
  @ApiProperty({ example: 'USD', description: 'Código ISO de la moneda' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  @Matches(/^[A-Z]{3}$/, {
    message: 'El código debe ser 3 letras mayúsculas',
  })
  code: string;

  @ApiProperty({ example: 'Dólar Estadounidense', description: 'Nombre completo' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '$', description: 'Símbolo de la moneda' })
  @IsNotEmpty()
  @IsString()
  symbol: string;
}