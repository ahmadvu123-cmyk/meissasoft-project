import { APP_FILTER } from "@nestjs/core";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMilitaryTime, IsInt, Min, Max, IsOptional, IsIn } from "class-validator";
import { AttendanceStatus } from "generated/prisma/enums";

export class AttendanceDto {
    
    @ApiProperty({example: "1"})
    @IsInt()
    worker_id: number

    @ApiProperty({example: '1990-01-30' })
    @IsDateString()
    date: string

    @ApiProperty({example: '08:00'})
    @IsMilitaryTime()
    check_in: string

    @ApiProperty({example: '06:00'})
    @IsOptional()
    @IsMilitaryTime()
    check_out: string

    @ApiProperty({example: '2'})
    @IsOptional()
    @IsInt()
    total_hours: number

    @ApiProperty({example: '1'})
    @IsOptional()
    @IsInt()
    overtime_hours: number

    @ApiProperty({example: 'PRESENT'})
    @IsEnum(AttendanceStatus)
    attendence_status: AttendanceStatus
}
