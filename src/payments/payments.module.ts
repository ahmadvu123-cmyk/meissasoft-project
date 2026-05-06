import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentRepository } from './payment.repository';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [PaymentController],
  providers: [PrismaService, PaymentService, PaymentRepository]
})
export class PaymentsModule {}
