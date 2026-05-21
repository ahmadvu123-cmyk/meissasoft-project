import { Test, TestingModule } from '@nestjs/testing';
import { ToolRouterService } from './tool.router.service';

describe('AgentRouterService', () => {
  let service: ToolRouterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToolRouterService],
    }).compile();

    service = module.get<ToolRouterService>(ToolRouterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
