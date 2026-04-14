import { Test, TestingModule } from '@nestjs/testing';
import { WageStructureController } from './wage.controller';

describe('WageStructureController', () => {
  let controller: WageStructureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WageStructureController],
    }).compile();

    controller = module.get<WageStructureController>(WageStructureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
