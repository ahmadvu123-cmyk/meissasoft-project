import { Injectable } from '@nestjs/common';
import { AgentService } from 'src/agents/agent.service';

@Injectable()
export class ChatbotService {
    constructor(private agentService: AgentService) {}
    async getUserPromptAndResponse(prompt: string) {
        return this.agentService.selectAndCallTool(prompt);
    }
}
