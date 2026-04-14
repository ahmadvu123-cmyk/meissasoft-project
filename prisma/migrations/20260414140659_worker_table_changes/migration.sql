/*
  Warnings:

  - A unique constraint covering the columns `[phone_num]` on the table `Worker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Worker_phone_num_key" ON "Worker"("phone_num");
