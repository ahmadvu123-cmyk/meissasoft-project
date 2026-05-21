import { ApiProperty } from "@nestjs/swagger";
import { DeductionType } from "@prisma/client";

export class CreateDeductionsResponseDto {
    @ApiProperty({
        example: "true",
        description: "This explain the success true or false"
    })
    success: Boolean
    @ApiProperty({
        type: 'object',
            properties: {
                id: { type: 'number', example: 1, description: 'The unique identifier for deduction' },
                tax_percentage: { type: 'number', example: 15, description: 'This is a standard percentage for tax' },
                deduction_type: { type: 'string', enum: Object.values(DeductionType), example: 'TAX', description: 'Represents the type of deduction' },
                createdAt: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of attendance creation' },
                updatedAt: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of attendance updation' }

            },
        

    })
    data:
        {
            id: number,
            tax_percentage: number,
            deduction_type: DeductionType,
            createdAt: Date,
            updatedAt: Date
        }
}
