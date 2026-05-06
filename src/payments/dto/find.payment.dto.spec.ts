import { FindPaymentDto } from '../../payments/dto/find.payment.dto';

describe('FindPaymentDto', () => {
  it('should be defined', () => {
    expect(new FindPaymentDto()).toBeDefined();
  });
});
