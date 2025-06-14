import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cryptocurrency } from 'src/modules/cryptocurrencies/entities/cryptocurrency.entity';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID único de la moneda (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Código único de la moneda (ISO 4217)',
    example: 'USD',
    maxLength: 3,
  })
  code: string;

  @Column()
  @ApiProperty({
    description: 'Nombre completo de la moneda',
    example: 'Dólar Estadounidense',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: 'Símbolo de la moneda',
    example: '$',
  })
  symbol: string;

  @OneToMany(() => Cryptocurrency, (crypto) => crypto.currency)
  @ApiProperty({
    description: 'Criptomonedas asociadas a esta moneda',
    type: () => [Cryptocurrency],
  })
  cryptocurrencies: Cryptocurrency[];

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
