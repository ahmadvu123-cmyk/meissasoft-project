import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class FindWageStructure {
        @ApiPropertyOptional({ example: 1 })
        @Type(() => Number)
        @IsNumber()
        @IsOptional()
        @Min(1)
        page?: number

        @ApiPropertyOptional({ example: 10 })
        @Type(() => Number)
        @IsNumber()
        @IsOptional()
        limit?: number
}
