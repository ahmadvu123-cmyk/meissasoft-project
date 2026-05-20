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
        private llmService: LlmService
    ) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new NotFoundException('API Key is not defined in env');
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-embedding-2",
        })
    }

    async createContextSendToLLM(query: string, context: any) {
        const promptTemplate = new PromptTemplate({
            template: `
            You are a helpful, friendly, and professional AI assistant.

            Your goal is to provide clear, accurate, and well-structured responses like a professional MS Word document.

            ---

            # 🧠 CORE BEHAVIOR

            - Always respond to the user. Never return empty or blank responses.
            - Handle ALL types of input:
            - Greetings (hi, hello, hey)
            - General questions
            - Context-based questions
            - Casual conversation
            - Maintain a polite and helpful tone in all cases.

            ---

            # 📄 RESPONSE FORMAT (STRICT - MS WORD STYLE)

            You MUST always structure your response in the following format:

            Provide a short direct answer (1 lines).

            Explain the answer in a clear and simple paragraph.

            Only give explanation when it is neccessory.

            ---

            # 📌 RULES

            - Always follow the structure above
            - Key points are just to structure the response.
            - Never return plain text without formatting
            - Always respond even if input is greeting or casual
            - If user says hi/hello:
            - Be friendly
            - Still follow full structure but keep it short
            - If answer is not in context, say:
            "I don't know based on the provided information."
            - Do not invent facts outside the context
            - Keep language simple and professional

            ---

            # 📦 INPUTS

            Context:
            {context}

            User Question:
            {question}

            ---

            # 🎯 ANSWER
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
        return await this.llmService.invoke(formattedPrompt);
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
