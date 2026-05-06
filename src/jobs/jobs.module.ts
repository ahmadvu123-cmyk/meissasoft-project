import { Module } from '@nestjs/common';
import { EmbeddingsModule } from 'src/embeddings/embeddings.module';
import { PayrollAndAttendanceJobService } from './payroll.and.attendance.job.service';

@Module({
    imports: [EmbeddingsModule],
    providers: [PayrollAndAttendanceJobService]
})
export class JobsModule {}
