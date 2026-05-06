import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsISO8601 } from "class-validator";
import { AttendanceStatus } from "generated/prisma/enums";

export class AttendanceDto {
    @ApiProperty({example: '1990-01-30T00:00:00.000Z' })
    @IsISO8601()
    date: string

    @ApiProperty({example: "1"})
    @IsInt()
    worker_id: number

    @ApiProperty({example: '1990-01-30T00:00:00.000Z'})
    @IsISO8601()
    check_in: string

    @ApiProperty({example: 'PRESENT'})
    @IsEnum(AttendanceStatus)
    attendance_status: AttendanceStatus
}
