import { ApiProperty } from "@nestjs/swagger";

export class DeleteWorkerResponseDto {
    @ApiProperty({
        example: 'true/false',
        description: 'Worker deleted or not'
    })
    success: string
    @ApiProperty({
        example: 'Worker deleted',
        description: 'Detemines that worker deleted'
    })
    message: string
}
