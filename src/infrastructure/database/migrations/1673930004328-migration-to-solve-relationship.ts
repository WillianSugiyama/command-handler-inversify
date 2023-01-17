import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationToSolveRelationship1673930004328 implements MigrationInterface {
  name = 'migrationToSolveRelationship1673930004328';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "test_entity" DROP CONSTRAINT "FK_ff4f1fc86067d93166f8a9f40bd"`);
    await queryRunner.query(`ALTER TABLE "test_entity" DROP COLUMN "test_child_id"`);
    await queryRunner.query(`ALTER TABLE "test_child_entity" ADD "test_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "test_child_entity" ADD CONSTRAINT "FK_5ceede062e0382abc1576813545" FOREIGN KEY ("test_id") REFERENCES "test_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "test_child_entity" DROP CONSTRAINT "FK_5ceede062e0382abc1576813545"`);
    await queryRunner.query(`ALTER TABLE "test_child_entity" DROP COLUMN "test_id"`);
    await queryRunner.query(`ALTER TABLE "test_entity" ADD "test_child_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "test_entity" ADD CONSTRAINT "FK_ff4f1fc86067d93166f8a9f40bd" FOREIGN KEY ("test_child_id") REFERENCES "test_child_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
