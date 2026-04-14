/*
  Warnings:

  - A unique constraint covering the columns `[cnic]` on the table `Worker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Worker_cnic_key" ON "Worker"("cnic");
