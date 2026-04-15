import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsNumber, IsISO8601 } from "class-validator";
import { AttendanceStatus } from "generated/prisma/enums";
export class UpdateAttendanceDto {
     @ApiProperty({example: 1})
        @IsInt()
        @IsOptional()
        worker_id: number
    
        @ApiProperty({example: '1990-01-30T00:00:00.000Z' })
        @IsOptional()
        @IsISO8601()
        date: string
    
        @ApiProperty({example: '1990-01-30T00:00:00.000Z'})
        @IsISO8601()
        @IsOptional()
        check_in: string
    
        @ApiProperty({example: '1990-01-30T00:00:00.000Z'})
        @IsOptional()
        @IsISO8601()
        check_out: string
        
        @ApiProperty({example: 'PRESENT'})
        @IsOptional()
        @IsEnum(AttendanceStatus)
        attendance_status: AttendanceStatus
}
