import { ApiProperty } from "@nestjs/swagger";
import { AttendanceStatus } from "generated/prisma/enums";

export class FindPaymentResponseDto {
     @ApiProperty({
        example: "true",
        description: "This explain the success true or false"
    })
    success: Boolean
    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1, description: 'The unique identifier for payment' },
                payroll_id: { type: 'number', example: 1, description: 'The unique identifier for payroll' },
                payment_date: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date of payroll creation' },
                salary: { type: 'number', example: 50000, description: 'This represents the salary' },
                createdAt: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of attendance creation' },
                updatedAt: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of attendance updation' }


            },
        }

    })
    data:
        {
            id: number,
            payroll_id: number,
            payment_date: Date,
            salary: number,
            createdAt: Date,
            updatedAt: Date
        }
}
