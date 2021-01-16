import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createCourse1610815220834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'courses',
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
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'amount',
          type: 'integer',
        },
        {
          name: 'hours',
          type: 'varchar',
        },
        {
          name: 'area',
          type: 'varchar'
        },
        {
          name: 'description',
          type: 'varchar'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('courses');
  }
}
