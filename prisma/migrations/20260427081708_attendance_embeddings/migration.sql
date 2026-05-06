/*
  Warnings:

  - You are about to drop the column `content` on the `AttendanceEmbeddings` table. All the data in the column will be lost.
  - You are about to drop the column `meta_data` on the `AttendanceEmbeddings` table. All the data in the column will be lost.
  - Added the required column `summary` to the `AttendanceEmbeddings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AttendanceEmbeddings" DROP COLUMN "content",
DROP COLUMN "meta_data",
ADD COLUMN     "summary" TEXT NOT NULL;
