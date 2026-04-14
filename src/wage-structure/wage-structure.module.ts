import { Module } from '@nestjs/common';
import { WageStructureController } from './wage.controller';
import { WageService } from './wage.service';
import { WageRespository } from './wage.respository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WageStructureController],
  providers: [PrismaService, WageService, WageRespository]
})
export class WageStructureModule {}
