/*
  Warnings:

  - You are about to drop the `PayrollDeductions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `base_salary` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_working_days` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PayrollDeductions" DROP CONSTRAINT "PayrollDeductions_deduction_id_fkey";

-- DropForeignKey
ALTER TABLE "PayrollDeductions" DROP CONSTRAINT "PayrollDeductions_payroll_id_fkey";

-- AlterTable
ALTER TABLE "Payroll" ADD COLUMN     "absent_days" INTEGER,
ADD COLUMN     "base_salary" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fine" DOUBLE PRECISION,
ADD COLUMN     "total_working_days" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PayrollDeductions";

-- DropEnum
DROP TYPE "AttendanceViewType";
