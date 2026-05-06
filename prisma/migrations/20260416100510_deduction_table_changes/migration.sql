/*
  Warnings:

  - You are about to drop the column `amount` on the `Deductions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Deductions" DROP COLUMN "amount",
ALTER COLUMN "tax_percentage" SET DEFAULT 15,
ALTER COLUMN "tax_percentage" SET DATA TYPE DOUBLE PRECISION;
