// src/modules/history/entities/cryptocurrency-history.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CryptocurrencyHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'ID del registro original en la tabla cryptocurrency' })
  originalId: string;

  @Column({ length: 10 })
  code: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 18, scale: 8 })
  currentPrice: number;

  @Column({ comment: 'ID de la moneda fiduciaria asociada' })
  currencyId: string;

  @Column({ comment: 'Código de la moneda fiduciaria en el momento de la replicación' })
  currencyCode: string;

  @Column()
  validFrom: Date;

  @Column()
  validTo: Date;

  @Column()
  createdAt: Date;
}