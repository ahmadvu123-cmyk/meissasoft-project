/*
  Warnings:

  - You are about to drop the column `meta_data` on the `AttendanceEmbedding` table. All the data in the column will be lost.
  - You are about to drop the column `meta_data` on the `PayrollEmbedding` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AttendanceEmbedding" DROP COLUMN "meta_data";

-- AlterTable
ALTER TABLE "PayrollEmbedding" DROP COLUMN "meta_data";
