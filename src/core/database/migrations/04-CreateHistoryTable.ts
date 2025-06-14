// src/core/database/migrations/04-CreateHistoryTables.ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHistoryTables implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'currency_history',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          { name: 'originalId', type: 'uuid' },
          { name: 'code', type: 'varchar', length: '3' },
          { name: 'name', type: 'varchar' },
          { name: 'symbol', type: 'varchar', length: '5' },
          { name: 'validFrom', type: 'timestamp' },
          { name: 'validTo', type: 'timestamp', isNullable: true },
          {
            name: 'createdAt',
            type:
              process.env.DB_TYPE === 'postgres'
                ? 'timestamp with time zone'
                : 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'cryptocurrency_history',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          { name: 'originalId', type: 'uuid' },
          { name: 'code', type: 'varchar', length: '10' },
          { name: 'name', type: 'varchar' },
          { name: 'currentPrice', type: 'decimal', precision: 18, scale: 8 },
          { name: 'currencyId', type: 'uuid' },
          { name: 'currencyCode', type: 'varchar', length: '3' },
          { name: 'validFrom', type: 'timestamp' },
          { name: 'validTo', type: 'timestamp', isNullable: true },
          {
            name: 'createdAt',
            type:
              process.env.DB_TYPE === 'postgres'
                ? 'timestamp with time zone'
                : 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cryptocurrency_history');
    await queryRunner.dropTable('currency_history');
  }
}
