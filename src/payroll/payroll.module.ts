import { Module } from '@nestjs/common';
import { PayrollController } from './payroll.controller';
import { PayrollService } from './payroll.service';
import { PayrollRepository } from './payroll.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkerRepository } from 'src/worker/worker.repository';
import { AttendanceRepository } from 'src/attendance/attendance.repository';
import { WageRespository } from 'src/wage-structure/wage.respository';
import { DeductionRepository } from 'src/deductions/deduction.repository';
import { PaymentRepository } from 'src/payments/payment.repository';




@Module({
  controllers: [PayrollController],
  providers: [PrismaService, PayrollService, PayrollRepository, PaymentRepository,
              WorkerRepository, AttendanceRepository, WageRespository, DeductionRepository]
})
export class PayrollModule {}
