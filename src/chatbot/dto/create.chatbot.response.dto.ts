import { ApiProperty } from "@nestjs/swagger";

export class CreateChatbotResponseDto {
    @ApiProperty({
        example: "true",
        description: "This explain the success true or false"
    })
    success: string
    @ApiProperty({
        example: 'Answer for user prompt',
        description: 'Detemines the answer of user prompt'
    })
    message: string
}
