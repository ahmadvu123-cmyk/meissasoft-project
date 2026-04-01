-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'WORKER');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'BANK_TRANSFER', 'CHEQUE');

-- CreateEnum
CREATE TYPE "DeductionType" AS ENUM ('LOAN', 'TAX', 'FINE');

-- CreateEnum
CREATE TYPE "WageType" AS ENUM ('HOURLY', 'MONTHLY', 'DAILY');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'HALF_DAY');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'UNPAID');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('PKR', 'USD');

-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_num" TEXT NOT NULL,
    "cnic" TEXT NOT NULL,
    "is_permanent" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'WORKER',

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "worker_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "check_in" TIME(0) NOT NULL,
    "check_out" TIME(0),
    "total_hours" INTEGER,
    "overtime_hours" INTEGER,
    "attendence_status" "AttendanceStatus" NOT NULL DEFAULT 'ABSENT',

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payroll" (
    "id" SERIAL NOT NULL,
    "worker_id" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "days_present" INTEGER NOT NULL,
    "overtime_hours" INTEGER NOT NULL,
    "overtime_pay" INTEGER NOT NULL,
    "total_deductions" INTEGER NOT NULL,
    "net_salary" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'PKR',
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WageStructure" (
    "id" SERIAL NOT NULL,
    "worker_id" INTEGER NOT NULL,
    "wage_type" "WageType" NOT NULL DEFAULT 'MONTHLY',
    "base_salary" INTEGER NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL DEFAULT 'CHEQUE',

    CONSTRAINT "WageStructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deductions" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "deduction_type" "DeductionType" NOT NULL DEFAULT 'TAX',

    CONSTRAINT "Deductions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollDeductions" (
    "id" SERIAL NOT NULL,
    "deduction_id" INTEGER NOT NULL,
    "payroll_id" INTEGER NOT NULL,

    CONSTRAINT "PayrollDeductions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "payroll_id" INTEGER NOT NULL,
    "salary" INTEGER NOT NULL,
    "payment_date" DATE NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WageStructure_worker_id_key" ON "WageStructure"("worker_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_payroll_id_key" ON "Payments"("payroll_id");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WageStructure" ADD CONSTRAINT "WageStructure_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollDeductions" ADD CONSTRAINT "PayrollDeductions_deduction_id_fkey" FOREIGN KEY ("deduction_id") REFERENCES "Deductions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollDeductions" ADD CONSTRAINT "PayrollDeductions_payroll_id_fkey" FOREIGN KEY ("payroll_id") REFERENCES "Payroll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_payroll_id_fkey" FOREIGN KEY ("payroll_id") REFERENCES "Payroll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
