import { ApiProperty } from "@nestjs/swagger";
import { WageType, PaymentMethod } from "@prisma/client";

export class CreateWageResponseDto {
    @ApiProperty({
        example: "true/false",
        description: "This explain the success true or false"
    })
    success: Boolean
    @ApiProperty({
        type: 'object',
        properties: {
            id: { type: 'number', example: 1, description: 'The unique identifier for wage structure' },
            wage_type: { type: 'string', enum: Object.values(WageType), example: 'HOURLY, DAILY, MONTHLY', description: 'This describes the wage type' },
            base_salary: { type: 'number', example: 30000, description: 'This describes the worker base salary' },
            payment_method: { type: 'string', enum: Object.values(PaymentMethod), example: 'CASH, BANK TRANSFER', description: 'This describes the payment method' },
            createdAt: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of wage structure creation' },
            updatedAt: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of wage structure updation' }
        },
    })
    data: {
        id: number,
        wage_type: WageType,
        base_salary: number,
        payment_method: PaymentMethod,
        createdAt: Date,
        updatedAt: Date
    }
}
