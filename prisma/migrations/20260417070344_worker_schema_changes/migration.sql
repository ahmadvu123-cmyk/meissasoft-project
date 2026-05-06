/*
  Warnings:

  - You are about to drop the column `fine` on the `Payroll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "fine";

-- AlterTable
ALTER TABLE "Worker" ALTER COLUMN "phone_num" DROP NOT NULL;
