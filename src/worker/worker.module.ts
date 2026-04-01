import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { WorkerRepository } from './worker.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WorkerController],
  providers: [PrismaService, WorkerService, WorkerRepository]

})
export class WorkerModule {}
