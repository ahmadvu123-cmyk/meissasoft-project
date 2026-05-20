import { ApiProperty } from "@nestjs/swagger"

export class DeleteWageResponseDto {

    @ApiProperty({
        example: 'true/false',
        description: 'Wage structure deleted or not'
    })
    success: string
    @ApiProperty({
        example: 'Wage Structure deleted',
        description: 'Detemines that wage structure deleted'
    })
    message: string
}
