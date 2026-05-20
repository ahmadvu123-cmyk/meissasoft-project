import { Controller, Post, Body, UseFilters, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppExceptionHandler } from 'src/common/helpers/app.exception.hander';
import { CreateChatbotDto } from './dto/create.chatbot.dto';
import { CreateChatbotResponseDto } from './dto/create.chatbot.response.dto';
import { ChatbotService } from './chatbot.service';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception/global-exception.filter';

@ApiTags('Chatbot')
@Controller('chatbot')
@UseFilters(GlobalExceptionFilter) // Global Exception Filter applies on all functions
export class ChatbotController {
    constructor(private chatbotService: ChatbotService) {}

    // Global Validation Pipes Applies on all routes

    @Post()
    @ApiOkResponse({
        description: 'User prompt response',
        type: CreateChatbotResponseDto
    })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User prompt response' })
    async createResponseOfPrompt(@Body() dto: CreateChatbotDto) {
        try {
            const promptResponse = await this.chatbotService.getUserPromptAndResponse(dto.prompt);
            return {
                success: true,
                content: promptResponse
            }
        } catch (error: any) {
            throw new AppExceptionHandler(error);
        }
    }

}
