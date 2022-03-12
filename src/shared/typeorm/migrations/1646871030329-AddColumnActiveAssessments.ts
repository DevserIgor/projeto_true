import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnActiveAssessments1646871030329
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'assessments',
      new TableColumn({
        name: 'approved',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('assessments', 'approved');
  }
}
