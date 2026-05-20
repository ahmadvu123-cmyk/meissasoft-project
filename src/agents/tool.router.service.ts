import { GoogleGenerativeAI } from '@google/generative-ai';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { LlmService } from './llm.service';
import { AgentService } from './agent.service';

@Injectable()
export class ToolRouterService {
    constructor(private llmService: LlmService,
        @Inject(forwardRef(() => AgentService))
        private agentService: AgentService) { }

    async selectToolWithLLM(query: string) {
        const prompt = `
        You are an intelligent routing system for an HR analytics chatbot.
        
        Your job is to classify the user query into ONE of the categories based on meaning.
        
        You MUST ALWAYS return one valid category. Never return empty, null, undefined, or invalid output.
        
        ---
        
        Available categories:
        
        1. overtime_pattern → user asks about overtime hours, extra working time, or working duration patterns.
        Example: "How many hours overtime did the worker do?"
        
        2. leave_trend → user asks about attendance/absence patterns over time.
        Example: "Show leave/absence trends over months"
        
        3. deduction_trend → user asks about salary deductions over time.
        Example: "Why deductions increased this month?"
        
        4. overtime_pay_trend → user asks about overtime payment trends or earnings from overtime.
        Example: "How much overtime pay does the worker usually get?"
        
        5. attendance_trend → user asks about attendance behavior using present/absent days.
        Example: "Analyze attendance consistency of the worker"
        
        6. analyze_salary → user asks about salary breakdown, net salary, base salary, or payment status.
        Example: "Explain salary structure and net salary"
        
        7. prediction → user asks about future trends or forecasting based on HR data.
        Example: "Predict future salary or attendance trend"
        
        
        
        ---
        
        IMPORTANT RULES:
        
        - Focus on USER INTENT, not keywords only
        - Choose the MOST relevant category
        - NEVER force a wrong HR tool
        - If no HR tool matches, then response natuarlly and your response should be short in one line and dont use key points
        - ALWAYS return ONLY ONE value exactly as written below:
        
        overtime_pattern | leave_trend | deduction_trend | overtime_pay_trend | attendance_trend | analyze_salary | prediction
        
        ---
        
        User Query:
        ${query}
        `;
        const res = this.llmService.invoke(prompt);
        const result = (await res).content.trim();
        console.log(result);

        switch (result) {
            case 'overtime_pattern':
                return this.agentService.getOverTime(query);
            case 'leave_trend':
                return this.agentService.getLeaves(query);
            case 'deduction_trend':
                return this.agentService.getDeductions(query);
            case 'overtime_pay_trend':
                return this.agentService.getOverTimePay(query);
            case 'attendance_trend':
                return this.agentService.getAttendances(query);
            case 'analyze_salary':
                return this.agentService.getSalaries(query);
            case 'prediction':
                return this.agentService.getAllAttendancesAndPayrolls(query);
            default:
                return this.llmService.invoke(prompt);
        }

    }
}
