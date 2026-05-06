import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ToolRouterService } from './tool.router.service';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { AgentRepository } from './agent.repository';
import { PromptTemplate } from '@langchain/core/prompts';
import { LlmService } from './llm.service';



@Injectable()
export class AgentService {
    private genAI: GoogleGenerativeAI;
    private model: GenerativeModel;

    constructor(
        @Inject(forwardRef(() => ToolRouterService))
        private toolRouter: ToolRouterService,
        private agentRepo: AgentRepository,
        private llmSerice: LlmService
    ) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new NotFoundException('API Key is not defined in env');
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-embedding-2",
        })
    }

    async createContextSendToLLM(query: string, context: any) {
        console.log(query, context);
        const promptTemplate = new PromptTemplate({
            template: `
                You are a helpful, friendly, and professional assistant.

                Your goal is to provide clear, accurate, and easy-to-understand answers.

                Guidelines:
                    - Use the provided context to answer the question.
                    - If the answer is not found in the context, say "I don't know based on the provided information."
                    - Keep the answer concise but helpful.
                    - Use simple language and explain if needed.
                    - Do not make up information.
                    - If relevant, format the answer in points for clarity.

                Context:
                    {context}

                User Question:
                    {question}

                Answer:
                    `,
            inputVariables: ["context", "question"],
        })
        const cleanContext = context
            .map((c: any) => `- ${c.summary}`)
            .join("\n");
        const formattedPrompt = await promptTemplate.format({
            context: cleanContext,
            question: query
        })
        return await this.llmSerice.invoke(formattedPrompt);

    }


    async selectAndCallTool(prompt: string) {
        return this.toolRouter.selectToolWithLLM(prompt);
    }

    // Tools are below

    async getOverTime(query: string) {
        const embeddings = await this.model.embedContent(query);
        const semanticSearchResponse = await this.agentRepo.semanticSearchAttendances(embeddings.embedding.values)
        return await this.createContextSendToLLM(query, semanticSearchResponse);

    }
    async getLeaves(query: string) {
        const embeddings = await this.model.embedContent(query);
        const semanticSearchResponse = await this.agentRepo.semanticSearchAttendances(embeddings.embedding.values)
        return await this.createContextSendToLLM(query, semanticSearchResponse);
    }
    async getDeductions(query: string) {
        const embeddings = await this.model.embedContent(query);
        const semanticSearchResponse = await this.agentRepo.semancticSearchPayrolls(embeddings.embedding.values)
        return await this.createContextSendToLLM(query, semanticSearchResponse);
    }
    async getOverTimePay(query: string) {
        const embeddings = await this.model.embedContent(query);
        const semanticSearchResponse = await this.agentRepo.semancticSearchPayrolls(embeddings.embedding.values)
        return await this.createContextSendToLLM(query, semanticSearchResponse);
    }
    async getAttendances(query: string) {
        const embeddings = await this.model.embedContent(query);
        const semanticSearchResponse = await this.agentRepo.semanticSearchAttendances(embeddings.embedding.values)
        return await this.createContextSendToLLM(query, semanticSearchResponse);
    }
    async getSalaries(query: string) {
        const embeddings = await this.model.embedContent(query);
        const semanticSearchResponse = await this.agentRepo.semancticSearchPayrolls(embeddings.embedding.values)
        return await this.createContextSendToLLM(query, semanticSearchResponse);
    }
    async getAllAttendancesAndPayrolls(query: string) {
        const embeddings = await this.model.embedContent(query);
        const semanticSearchResponse = await this.agentRepo.semanticSearchAttendancesAndPayrolls(embeddings.embedding.values)
        return await this.createContextSendToLLM(query, semanticSearchResponse);
    }


}
