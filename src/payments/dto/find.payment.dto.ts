import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class FindPaymentDto {
    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number

    @ApiPropertyOptional({ example: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number
}
