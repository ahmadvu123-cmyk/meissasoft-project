import { Test, TestingModule } from '@nestjs/testing';
import { DeductionController } from './deduction.controller';

describe('DeductionController', () => {
  let controller: DeductionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeductionController],
    }).compile();

    controller = module.get<DeductionController>(DeductionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
