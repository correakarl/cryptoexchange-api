// src/modules/history/entities/currency-history.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CurrencyHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'ID del registro original en la tabla currency' })
  originalId: string;

  @Column({ length: 3 })
  code: string;

  @Column()
  name: string;

  @Column({ length: 5 })
  symbol: string;

  @Column()
  validFrom: Date;

  @Column()
  validTo: Date;

  @Column()
  createdAt: Date;
}
