import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { AttendanceRepository } from './attendance.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AttendanceHelper } from 'src/common/helpers/attendance.helper';



@Module({
  controllers: [AttendanceController],
  providers: [PrismaService, AttendanceService, AttendanceRepository, AttendanceHelper]
})
export class AttendanceModule {}
