import { ApiProperty } from "@nestjs/swagger";
import { PaymentStatus, Currency } from "generated/prisma/enums";

export class FindPayrollResponseDto {
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
                id: { type: 'number', example: 1, description: 'The unique identifier for payroll' },
                worker_id: { type: 'number', example: 1, description: 'The unique identifier for payroll' },
                base_salary: { type: 'number', example: 30000, description: 'Base salary of a worker' },
                month: { type: 'string', example: '2026-04-08T12:52:12.733Z', description: 'Represents the month of payroll' },
                year: { type: 'string', example: '2026-04-08T12:52:12.733Z', description: 'Represents the year of payroll' },
                total_working_days: { type: 'number', example: 20, description: 'This defines the total working days in a month' },
                net_salary: { type: 'number', example: 30000, description: 'This defines the total base salary of a worker' },
                currency: { type: 'string', enum: Object.values(Currency), example: 'PKR/USD', description: 'Represents the status of attendance' },
                payment_status: { type: 'string', enum: Object.values(PaymentStatus), example: 'PAID/UNPAID', description: 'This defines the status of payment' },
                createdAt: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of attendance creation' },
                updatedAt: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of attendance updation' }
            },
        }
    })
    data:
        {
            id: number,
            worker_id: number,
            base_salary: number,
            month: Date,
            year: Date,
            total_working_days: number,
            net_salary: number,
            currency: Currency,
            payment_status: PaymentStatus,
            createdAt: Date,
            updatedAt: Date
        }
}
