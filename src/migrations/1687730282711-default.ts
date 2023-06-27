import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687730282711 implements MigrationInterface {
    name = 'Default1687730282711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_order" ("product_id" integer NOT NULL, "order_id" integer NOT NULL, CONSTRAINT "PK_1eebf3def9656af1f544ce78c44" PRIMARY KEY ("product_id", "order_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2a8da6a067cb59557b708fd4a2" ON "product_order" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_44a63452d4f45e3e54a3028e9e" ON "product_order" ("order_id") `);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_2a8da6a067cb59557b708fd4a29" FOREIGN KEY ("product_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_44a63452d4f45e3e54a3028e9e5" FOREIGN KEY ("order_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_44a63452d4f45e3e54a3028e9e5"`);
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_2a8da6a067cb59557b708fd4a29"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44a63452d4f45e3e54a3028e9e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a8da6a067cb59557b708fd4a2"`);
        await queryRunner.query(`DROP TABLE "product_order"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
