import { AttendanceRepository } from './attendance.repository';

describe('AttendanceRepository', () => {
  it('should be defined', () => {
    expect(new AttendanceRepository()).toBeDefined();
  });
});
