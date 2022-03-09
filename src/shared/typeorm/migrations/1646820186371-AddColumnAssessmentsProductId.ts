import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnAssessmentsProductId1646820186371
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'assessments',
      new TableColumn({
        name: 'product_id',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('assessments', 'product_id');
  }
}
