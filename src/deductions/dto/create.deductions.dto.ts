import { IsString, IsEnum, IsNumber } from "class-validator";
import { DeductionType } from "generated/prisma/enums";
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeductionsDto {
    @ApiProperty({ example: '15' })
    @IsNumber()
    tax_percentage: number;

    @ApiProperty({ example: 'TAX' })
    @IsString()
    @IsEnum(DeductionType)
    deduction_type: DeductionType

}
