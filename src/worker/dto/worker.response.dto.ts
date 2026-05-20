import { ApiProperty } from "@nestjs/swagger";
import { Role } from "generated/prisma/enums";

export class WorkerResponseDto {

    @ApiProperty({
        example: "true/false",
        description: "This explain the success true or false"
    })
    success: Boolean
    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1, description: 'The unique identifier for worker' },
                name: { type: 'string', example: 'Fahad Rajpoot', description: 'This is full name of worker' },
                phone_num: { type: 'string', example: '0300-0000000', description: 'Valid phone number of worker' },
                cnic: { type: 'string', example: '35202-00000000-0', description: 'Valid cnic of worker' },
                is_permanent: { type: 'boolean', example: 'true/false', description: 'Worker is permanent or not' },
                role: { type: 'string', enum: Object.values(Role), example: 'ADMIN/WORKER', description: 'Define the role of worker' },
                createdAt: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of worker creation' },
                updatedAt: { type: 'string', example: '2026-04-08T12:52:12.733Z', format: 'date-time', description: 'Date and time of worker updation' }
            },
        }
    })
    data:
        {
            id: number,
            name: string,
            phone_num: string,
            cnic: string,
            is_permanent: boolean,
            role: Role,
            createdAt: Date,
            updatedAt: Date
        }
}
