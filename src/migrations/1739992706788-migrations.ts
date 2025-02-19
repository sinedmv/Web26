import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1739992706788 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" (
            "id" SERIAL NOT NULL, 
            "login" character varying NOT NULL, 
            "password" character varying NOT NULL, 
            "firstName" character varying NOT NULL, 
            "lastName" character varying NOT NULL, 
            "email" character varying NOT NULL, 
            "isAdmin" boolean NOT NULL DEFAULT false, 
            CONSTRAINT "UQ_user_login" UNIQUE ("login"), 
            CONSTRAINT "UQ_user_email" UNIQUE ("email"), 
            CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "olympiad" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "organization" character varying NOT NULL, 
            "subject" character varying NOT NULL, 
            "registrationStartDate" TIMESTAMP NOT NULL, 
            "registrationEndDate" TIMESTAMP NOT NULL, 
            "olympiadDate" TIMESTAMP NOT NULL, 
            "additionalInfo" text, 
            CONSTRAINT "PK_olympiad_id" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "news" (
            "id" SERIAL NOT NULL, 
            "title" character varying NOT NULL, 
            "content" text NOT NULL, 
            CONSTRAINT "PK_news_id" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "message" (
            "id" SERIAL NOT NULL, 
            "content" text NOT NULL, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "authorId" integer, 
            "olympiadId" integer, 
            "newsId" integer, 
            CONSTRAINT "PK_message_id" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`CREATE TABLE "notification" (
            "id" SERIAL NOT NULL, 
            "userId" integer, 
            "olympiadId" integer, 
            "notificationDate" TIMESTAMP NOT NULL, 
            CONSTRAINT "PK_notification_id" PRIMARY KEY ("id")
        )`);

        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_message_author" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_message_olympiad" FOREIGN KEY ("olympiadId") REFERENCES "olympiad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_message_news" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_notification_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_notification_olympiad" FOREIGN KEY ("olympiadId") REFERENCES "olympiad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_notification_olympiad"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_notification_user"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_message_news"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_message_olympiad"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_message_author"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "olympiad"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
