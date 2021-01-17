import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createReserv1610882706796 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'reserves',
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
          name: 'localization_id',
          type: 'integer',
        },
        {
          name: 'user_id',
          type: 'integer',
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reserves');
  }
}
