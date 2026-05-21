import { ApiProperty } from "@nestjs/swagger";
import { AttendanceStatus } from "@prisma/client";

export class CreateAttendanceResponseDto {
    @ApiProperty({
        example: "true",
        description: "This explain the success true or false"
    })
    success: Boolean
    @ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'number', example: 1, description: 'The unique identifier for attendance' },
            worker_id: { type: 'number', example: 1, description: 'The unique identifier for worker' },
            date: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Current date of the day' },
            check_in: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of worker check in' },
            check_out: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of worker check out' },
            attendance_status: { type: 'string', enum: Object.values(AttendanceStatus), example: 'PRESENT/ABSENT/LATE/HALF DAY', description: 'Represents the status of attendance' },
            createdAt: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of attendance creation' },
            updatedAt: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of attendance updation' }
        },
    })
    data:
        {
            id: number,
            worker_id: number,
            date: Date,
            check_in: Date,
            check_out: Date,
            // total_hours: number,
            // overtime_hours: number,
            attendance_status: AttendanceStatus,
            createdAt: Date,
            updatedAt: Date
        }
}
