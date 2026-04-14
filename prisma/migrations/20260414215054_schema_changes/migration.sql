/*
  Warnings:

  - The values [LATE,HALF_DAY] on the enum `AttendanceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [CHEQUE] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttendanceStatus_new" AS ENUM ('PRESENT', 'ABSENT');
ALTER TABLE "public"."Attendance" ALTER COLUMN "attendance_status" DROP DEFAULT;
ALTER TABLE "Attendance" ALTER COLUMN "attendance_status" TYPE "AttendanceStatus_new" USING ("attendance_status"::text::"AttendanceStatus_new");
ALTER TYPE "AttendanceStatus" RENAME TO "AttendanceStatus_old";
ALTER TYPE "AttendanceStatus_new" RENAME TO "AttendanceStatus";
DROP TYPE "public"."AttendanceStatus_old";
ALTER TABLE "Attendance" ALTER COLUMN "attendance_status" SET DEFAULT 'ABSENT';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('CASH', 'BANK_TRANSFER');
ALTER TABLE "public"."WageStructure" ALTER COLUMN "payment_method" DROP DEFAULT;
ALTER TABLE "WageStructure" ALTER COLUMN "payment_method" TYPE "PaymentMethod_new" USING ("payment_method"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "public"."PaymentMethod_old";
ALTER TABLE "WageStructure" ALTER COLUMN "payment_method" SET DEFAULT 'CASH';
COMMIT;

-- AlterTable
ALTER TABLE "Payroll" ALTER COLUMN "total_deductions" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WageStructure" ALTER COLUMN "payment_method" SET DEFAULT 'CASH';
