import { ApiProperty } from "@nestjs/swagger"

export class DeletePaymentResponseDto {
    @ApiProperty({
        example: 'true/false',
        description: 'Payment deleted or not'
    })
    success: string
    @ApiProperty({
        example: 'Payment deleted',
        description: 'Detemines that payment deleted'
    })
    message: string
}
