import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { AgentsModule } from 'src/agents/agents.module';

@Module({
  controllers: [ChatbotController],
  imports: [AgentsModule],
  providers: [ChatbotService],
})
export class ChatbotModule {}
