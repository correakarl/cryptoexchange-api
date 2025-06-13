import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('historical_cryptocurrencies')
export class HistoricalCryptocurrency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ length: 10 })
  symbol: string;

  @Column('json')
  currencies: { id: string; code: string }[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  archivedAt: Date;
}