import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 3, unique: true })
  code: string; // USD, EUR, VES...

  @Column()
  name: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}