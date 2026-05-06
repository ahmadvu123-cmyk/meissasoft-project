import { Module } from '@nestjs/common';
import { ToolRouterService } from './tool.router.service';
import { LlmService } from './llm.service';
import { AgentService } from './agent.service';
import { AgentRepository } from './agent.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PrismaService, ToolRouterService, LlmService, AgentService, AgentRepository],
  exports: [ToolRouterService, LlmService, AgentService, AgentRepository]
})
export class AgentsModule {}
