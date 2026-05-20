import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsISO8601, IsNumber, IsOptional, Min, IsString } from "class-validator";

export class GetAttendanceDto {
        @ApiProperty({ example: 1, required: false })
        @IsOptional()
        @IsNumber()
        @Type(() => Number)
        worker_id: number

        @ApiPropertyOptional({ example: '1990-01-30T00:00:00.000Z' })
        @IsOptional()
        @Transform(({ value }) => value === '' ? undefined : value)
        @IsISO8601()
        start_date?: string

        @ApiPropertyOptional({ example: '1990-01-30T00:00:00.000Z' })
        @IsOptional()
        @Transform(({ value }) => value === '' ? undefined : value)
        @IsISO8601()
        end_date?: string

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

        @ApiPropertyOptional({ example: "Fahad Rajpoot" })
        @IsOptional()
        @Type(() => String)
        @IsString()
        search?: string
}
