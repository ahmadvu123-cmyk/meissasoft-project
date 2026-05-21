import { IsString, IsEnum, IsNumber, IsOptional } from "class-validator";
import { DeductionType } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeductionsDto {
    @ApiProperty({ example: '15' })
    @IsOptional()
    @IsNumber()
    tax_percentage?: number;

    @ApiProperty({ example: 'TAX' })
    @IsOptional()
    @IsString()
    @IsEnum(DeductionType)
    deduction_type?: DeductionType
}
