import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { AttendanceRepository } from './attendance.repository';
import { PrismaService } from 'src/prisma/prisma.service';



@Module({
  controllers: [AttendanceController],
  providers: [PrismaService, AttendanceService, AttendanceRepository]
})
export class AttendanceModule {}
