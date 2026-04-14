import { IsString, IsEnum, IsNumber } from "class-validator";
import { WageType, PaymentMethod } from "generated/prisma/enums";
import { ApiProperty } from '@nestjs/swagger';

export class CreateWageDto {
    @ApiProperty({example: '1'})
        @IsNumber()
        worker_id: number;
    
        @ApiProperty({example: 'MONTHLY'})
        @IsString()
        @IsEnum(WageType)
        wage_type: WageType;
    
        @ApiProperty({example: '30000'})
        @IsNumber()
        base_salary : number;
    
        @ApiProperty({example: 'CASH'})
        @IsEnum(PaymentMethod)
        payment_method: PaymentMethod;
}
