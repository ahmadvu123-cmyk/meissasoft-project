/*
  Warnings:

  - Added the required column `meta_data` to the `AttendanceEmbeddings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AttendanceEmbeddings" ADD COLUMN     "meta_data" JSONB NOT NULL;
