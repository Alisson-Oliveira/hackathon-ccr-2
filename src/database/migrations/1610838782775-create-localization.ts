import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createLocalization1610833654741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'localizations',
      columns: [
        {
          name: '_id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'institution',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'float',
        },
        {
          name: 'longitude',
          type: 'float'
        },
        {
          name: 'schadule',
          type: 'varchar',
        },
        {
          name: 'reservation_location',
          type: 'varchar',
        },
        {
          name: 'available',
          type: 'boolean',
        }
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('localizations');
  }
}
