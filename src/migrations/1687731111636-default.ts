import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687731111636 implements MigrationInterface {
    name = 'Default1687731111636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_6da780c1800bb5428ba9d59e9ed"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "ordersId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD "ordersId" integer`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_6da780c1800bb5428ba9d59e9ed" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
