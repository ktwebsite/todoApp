/*
  Warnings:

  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(120)`.
  - You are about to alter the column `details` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10000)`.

*/
-- AlterTable
ALTER TABLE "public"."Post" ALTER COLUMN "title" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "details" SET DATA TYPE VARCHAR(10000);
