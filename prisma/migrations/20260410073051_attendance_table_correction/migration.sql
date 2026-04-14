/*
  Warnings:

  - You are about to drop the column `attendence_status` on the `Attendance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "attendence_status",
ADD COLUMN     "attendance_status" "AttendanceStatus" NOT NULL DEFAULT 'ABSENT';
