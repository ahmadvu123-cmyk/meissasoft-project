/*
  Warnings:

  - A unique constraint covering the columns `[worker_id,month,year]` on the table `Payroll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payroll_worker_id_month_year_key" ON "Payroll"("worker_id", "month", "year");
