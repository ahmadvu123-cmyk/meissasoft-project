import { Test, TestingModule } from '@nestjs/testing';
import { AgentRouterService } from '../agent.router.service';

describe('AgentRouterService', () => {
  let service: AgentRouterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentRouterService],
    }).compile();

    service = module.get<AgentRouterService>(AgentRouterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
