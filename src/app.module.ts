import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { WorkerModule } from './worker/worker.module';
import { AttendanceModule } from './attendance/attendance.module';
import { WageStructureModule } from './wage-structure/wage-structure.module';
import { DeductionsModule } from './deductions/deductions.module';
import { PayrollModule } from './payroll/payroll.module';
import { PaymentsModule } from './payments/payments.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { JobsModule } from './jobs/jobs.module';
import { EmbeddingsModule } from './embeddings/embeddings.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AgentsModule } from './agents/agents.module';
import 'dotenv/config';



@Module({
  imports: [WorkerModule, AttendanceModule, WageStructureModule, DeductionsModule, 
    PayrollModule, PaymentsModule, ChatbotModule, EmbeddingsModule, JobsModule, ScheduleModule.forRoot(), AgentsModule,],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
