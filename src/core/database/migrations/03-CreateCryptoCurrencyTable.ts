// src/core/database/migrations/03-CreateCryptocurrencyTable.ts
import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateCryptocurrencyTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cryptocurrency",
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
            length: "10",
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "currentPrice",
            type: "decimal",
            precision: 18,
            scale: 8,
          },
          {
            name: "currencyId",
            type: "varchar",
          },
          {
            name: "createdAt",
            type:
              process.env.DB_TYPE === 'postgres'
                ? 'timestamp with time zone'
                : 'datetime',
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type:
              process.env.DB_TYPE === 'postgres'
                ? 'timestamp with time zone'
                : 'datetime',
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Foreign key hacia currency
    await queryRunner.createForeignKey(
      "cryptocurrency",
      new TableForeignKey({
        columnNames: ["currencyId"],
        referencedColumnNames: ["id"],
        referencedTableName: "currency",
        onDelete: "CASCADE",
        name: "FK_CRYPTOCURRENCY_CURRENCY",
      })
    );

    // Índices
    await queryRunner.createIndex(
      "cryptocurrency",
      new TableIndex({
        name: "IDX_CRYPTOCURRENCY_CODE",
        columnNames: ["code"],
        isUnique: true,
      })
    );

    await queryRunner.createIndex(
      "cryptocurrency",
      new TableIndex({
        name: "IDX_CRYPTOCURRENCY_CURRENCY",
        columnNames: ["currencyId"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Verificar si la tabla existe antes de intentar eliminar la FK
    const table = await queryRunner.getTable("cryptocurrency");
    
    if (table) {
      // Buscar la foreign key de manera segura
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("currencyId") !== -1
      );
      
      if (foreignKey) {
        await queryRunner.dropForeignKey("cryptocurrency", foreignKey);
      }
    }

    // Eliminar la tabla
    await queryRunner.dropTable("cryptocurrency");
  }
}