import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsISO8601, IsNumber, IsOptional } from "class-validator";
import { Currency, PaymentStatus } from "generated/prisma/enums";

export class UpdatePayrollDto {
    @ApiProperty({ example: "1" })
    @IsInt()
    worker_id: number

    @ApiProperty({ example: '30000' })
    @IsOptional()
    @IsNumber()
    base_salary: number

    @ApiProperty({ example: '20' })
    @IsOptional()
    @IsNumber()
    total_working_days: number

    @ApiProperty({ example: '10'})
    @IsOptional()
    @IsNumber()
    overtime_hours: number

    @ApiProperty({ example: '15'})
    @IsOptional()
    @IsNumber()
    total_deduction: number

    @ApiProperty({ example: '10'})
    @IsOptional()
    @IsNumber()
    days_present: number

    @ApiProperty({ example: 'PKR' })
    @IsOptional()
    @IsEnum(Currency)
    currency: Currency

    @ApiProperty({ example: 'PAID' })
    @IsOptional()
    @IsEnum(PaymentStatus)
    payment_status: PaymentStatus
}
