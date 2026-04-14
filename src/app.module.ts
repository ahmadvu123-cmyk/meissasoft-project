import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { WorkerModule } from './worker/worker.module';
import { AttendanceModule } from './attendance/attendance.module';
import { WageStructureModule } from './wage-structure/wage-structure.module';


@Module({
  imports: [WorkerModule, AttendanceModule, WageStructureModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
