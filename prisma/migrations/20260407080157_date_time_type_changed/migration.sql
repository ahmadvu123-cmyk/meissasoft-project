/*
  Warnings:

  - The `check_out` column on the `Attendance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `check_in` on the `Attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3),
DROP COLUMN "check_in",
ADD COLUMN     "check_in" TIMESTAMP(3) NOT NULL,
DROP COLUMN "check_out",
ADD COLUMN     "check_out" TIMESTAMP(3),
ALTER COLUMN "total_hours" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "overtime_hours" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Deductions" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "salary" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "payment_date" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Payroll" ALTER COLUMN "overtime_hours" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "overtime_pay" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "total_deductions" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "net_salary" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "WageStructure" ALTER COLUMN "base_salary" SET DATA TYPE DOUBLE PRECISION;
