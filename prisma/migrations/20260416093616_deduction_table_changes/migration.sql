/*
  Warnings:

  - The values [LOAN] on the enum `DeductionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DeductionType_new" AS ENUM ('TAX', 'FINE');
ALTER TABLE "public"."Deductions" ALTER COLUMN "deduction_type" DROP DEFAULT;
ALTER TABLE "Deductions" ALTER COLUMN "deduction_type" TYPE "DeductionType_new" USING ("deduction_type"::text::"DeductionType_new");
ALTER TYPE "DeductionType" RENAME TO "DeductionType_old";
ALTER TYPE "DeductionType_new" RENAME TO "DeductionType";
DROP TYPE "public"."DeductionType_old";
ALTER TABLE "Deductions" ALTER COLUMN "deduction_type" SET DEFAULT 'TAX';
COMMIT;

-- AlterTable
ALTER TABLE "Deductions" ADD COLUMN     "tax_percentage" INTEGER NOT NULL DEFAULT 15;
