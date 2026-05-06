/*
  Warnings:

  - Added the required column `meta_data` to the `AttendanceEmbedding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meta_data` to the `PayrollEmbedding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AttendanceEmbedding" ADD COLUMN     "meta_data" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "PayrollEmbedding" ADD COLUMN     "meta_data" JSONB NOT NULL;
