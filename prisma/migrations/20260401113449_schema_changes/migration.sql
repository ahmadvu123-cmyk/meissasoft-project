-- AlterTable
ALTER TABLE "Payroll" ALTER COLUMN "days_present" DROP NOT NULL,
ALTER COLUMN "overtime_hours" DROP NOT NULL,
ALTER COLUMN "overtime_pay" DROP NOT NULL,
ALTER COLUMN "net_salary" DROP NOT NULL;
