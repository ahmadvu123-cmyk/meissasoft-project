import { ApiProperty } from "@nestjs/swagger"

export class DeleteDeductionsResponseDto {

    @ApiProperty({
        example: 'true/false',
        description: 'Deduction deleted or not'
    })
    success: string
    @ApiProperty({
        example: 'Deduction deleted',
        description: 'Detemines that deduction deleted'
    })
    message: string
}
