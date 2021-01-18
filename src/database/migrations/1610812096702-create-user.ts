import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1610777249160 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
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
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'varchar'
        },
        {
          name: 'area',
          type: 'varchar',
        },
        {
          name: 'points',
          type: 'float'
        },
        {
          name: 'course',
          type: 'varchar',
        },
        {
          name: 'age',
          type: 'integer',
        }
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
