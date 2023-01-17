import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1673891970495 implements MigrationInterface {
  name = 'initialMigration1673891970495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "test_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "task" character varying NOT NULL, "test_child_id" uuid, CONSTRAINT "PK_cc0413536e3afc0e586996bea40" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "test_child_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "value" character varying NOT NULL, CONSTRAINT "PK_9229e13471b7c18575d6420eed3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "test_entity" ADD CONSTRAINT "FK_ff4f1fc86067d93166f8a9f40bd" FOREIGN KEY ("test_child_id") REFERENCES "test_child_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "test_entity" DROP CONSTRAINT "FK_ff4f1fc86067d93166f8a9f40bd"`
    );
    await queryRunner.query(`DROP TABLE "test_child_entity"`);
    await queryRunner.query(`DROP TABLE "test_entity"`);
  }
}
