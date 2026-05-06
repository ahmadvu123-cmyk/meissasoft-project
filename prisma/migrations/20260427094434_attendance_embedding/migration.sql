/*
  Warnings:

  - You are about to drop the `AttendanceEmbeddings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AttendanceEmbeddings";

-- CreateTable
CREATE TABLE "AttendanceEmbedding" (
    "id" SERIAL NOT NULL,
    "summary" TEXT NOT NULL,
    "embedding" vector(1536) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "AttendanceEmbedding_pkey" PRIMARY KEY ("id")
);
