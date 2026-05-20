import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { AgentsModule } from 'src/agents/agents.module';
import { ChatbotGateway } from './chatbot.gateway';

@Module({
  controllers: [ChatbotController],
  imports: [AgentsModule],
  providers: [ChatbotService, ChatbotGateway],
})
export class ChatbotModule {}
