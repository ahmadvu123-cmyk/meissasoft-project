import { ApiProperty } from "@nestjs/swagger"

export class DeletePayrollResponseDto {
    @ApiProperty({
        example: 'true/false',
        description: 'Payroll deleted or not'
    })
    success: string
    @ApiProperty({
        example: 'Payroll deleted',
        description: 'Detemines that payroll deleted'
    })
    message: string
}
