import { ApiProperty } from "@nestjs/swagger"

export class DeleteAttendanceResponseDto {
    @ApiProperty({
            example: 'true/false',
            description: 'Attendance deleted or not'
        })
        success: string
        @ApiProperty({
            example: 'Attendance deleted',
            description: 'Detemines that attendance deleted'
        })
        message: string
}
