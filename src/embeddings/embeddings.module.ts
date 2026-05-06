import { Module } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';
import { AttendanceRepository } from 'src/attendance/attendance.repository';
import { PayrollRepository } from 'src/payroll/payroll.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmbeddingRepository } from './embedding.repository';

@Module({
  providers: [PrismaService ,EmbeddingService, AttendanceRepository, PayrollRepository, EmbeddingRepository],
  exports: [EmbeddingService, EmbeddingRepository],
})
export class EmbeddingsModule {}
