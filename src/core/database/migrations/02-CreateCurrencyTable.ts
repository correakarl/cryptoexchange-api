// src/core/database/migrations/03-CreateCryptocurrencyTable.ts
import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateCurrencyTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "currency",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "code",
            type: "varchar",
            length: "3",
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "symbol",
            type: "varchar",
            length: "5",
          },
          {
            name: "createdAt",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Índice para búsqueda por código
    await queryRunner.createIndex(
      "currency",
      new TableIndex({
        name: "IDX_CURRENCY_CODE",
        columnNames: ["code"],
        isUnique: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("currency");
  }
}