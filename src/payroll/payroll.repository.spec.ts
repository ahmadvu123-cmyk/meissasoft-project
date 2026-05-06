import { PayrollRepository } from './payroll.repository';

describe('PayrollRepository', () => {
  it('should be defined', () => {
    expect(new PayrollRepository()).toBeDefined();
  });
});
