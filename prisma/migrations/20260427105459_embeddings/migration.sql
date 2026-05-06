/*
  Warnings:

  - Made the column `embedding` on table `AttendanceEmbedding` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AttendanceEmbedding" ALTER COLUMN "embedding" SET NOT NULL;
