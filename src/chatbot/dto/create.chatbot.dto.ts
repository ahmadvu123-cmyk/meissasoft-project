import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class CreateChatbotDto {
    @ApiProperty({ example: 'Leave of the current month' })
    @IsOptional()
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim().toLowerCase() : value
    )
    @IsString()
    prompt: string
}
