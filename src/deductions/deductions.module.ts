import { Module } from '@nestjs/common';
import { DeductionController } from './deduction.controller';
import { DeductionService } from './deduction.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeductionRepository } from './deduction.repository';

@Module({
  controllers: [DeductionController],
  providers: [PrismaService, DeductionService, DeductionRepository]
})
export class DeductionsModule {}
