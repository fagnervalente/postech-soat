import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688323963770 implements MigrationInterface {
    name = 'Default1688323963770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "productCategories" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_18689e515294b585b14e0d00042" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "price" numeric(15,2) NOT NULL, "category_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'Recebido', "paymentStatus" "public"."orders_paymentstatus_enum" NOT NULL DEFAULT 'Aguardando pagamento', "totalPrice" numeric(15,2) NOT NULL, "customer_id" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "name" text NOT NULL, "cpf" text NOT NULL, "email" text NOT NULL, CONSTRAINT "UQ_413de651cfd9c576b99cec83fd3" UNIQUE ("cpf"), CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_order" ("product_id" integer NOT NULL, "order_id" integer NOT NULL, CONSTRAINT "PK_1eebf3def9656af1f544ce78c44" PRIMARY KEY ("product_id", "order_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2a8da6a067cb59557b708fd4a2" ON "product_order" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_44a63452d4f45e3e54a3028e9e" ON "product_order" ("order_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "productCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_2a8da6a067cb59557b708fd4a29" FOREIGN KEY ("product_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_44a63452d4f45e3e54a3028e9e5" FOREIGN KEY ("order_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_44a63452d4f45e3e54a3028e9e5"`);
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_2a8da6a067cb59557b708fd4a29"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44a63452d4f45e3e54a3028e9e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a8da6a067cb59557b708fd4a2"`);
        await queryRunner.query(`DROP TABLE "product_order"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "productCategories"`);
    }

}