import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class LlmService {
    private genAI: GoogleGenerativeAI;
    private model: GenerativeModel;
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new NotFoundException('API Key is not defined in env')
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-3.1-flash-lite-preview",
        })
    }

    async invoke(prompt: string) {
        const result = await this.model.generateContent(prompt);
        const response = result.response;

        return {
            content: response.text()
        }
    }


}
