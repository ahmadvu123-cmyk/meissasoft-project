import { FindPaymentResponseDto } from '../../payments/dto/find.payment.response.dto';

describe('FindPaymentResponseDto', () => {
  it('should be defined', () => {
    expect(new FindPaymentResponseDto()).toBeDefined();
  });
});
