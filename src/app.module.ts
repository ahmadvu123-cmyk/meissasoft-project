import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { WorkerModule } from './worker/worker.module';

@Module({
  imports: [WorkerModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
