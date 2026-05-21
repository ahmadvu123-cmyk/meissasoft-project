import { Test, TestingModule } from '@nestjs/testing';
import { PayrollAndAttendanceJobService } from './payroll.and.attendance.job.service';

describe('PayrollAndAttendanceJobService', () => {
  let service: PayrollAndAttendanceJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayrollAndAttendanceJobService],
    }).compile();

    service = module.get<PayrollAndAttendanceJobService>(PayrollAndAttendanceJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
