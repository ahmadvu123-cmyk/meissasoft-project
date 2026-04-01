import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { WorkerModule } from './worker/worker.module';
import { AttendanceModule } from './attendance/attendance.module';


@Module({
  imports: [WorkerModule, AttendanceModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
