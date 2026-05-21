import { IsString, IsEnum, IsOptional, IsNumber } from "class-validator";
import { WageType, PaymentMethod } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWageDto {
        @ApiProperty({ example: '1' })
        @IsNumber()
        @IsOptional()
        worker_id: number;

        @ApiProperty({ example: 'MONTHLY' })
        @IsString()
        @IsOptional()
        @IsEnum(WageType)
        wage_type: WageType;

        @ApiProperty({ example: '30000' })
        @IsNumber()
        @IsOptional()
        base_salary: number;

        @ApiProperty({ example: 'CASH' })
        @IsEnum(PaymentMethod)
        @IsOptional()
        payment_method: PaymentMethod;
}
