import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsISO8601, IsNumber } from "class-validator";
import { Currency, PaymentStatus } from "generated/prisma/enums";

export class CreatePayrollDto {
    @ApiProperty({ example: "1" })
    @IsInt()
    worker_id: number

    // @ApiProperty({ example: '30000' })
    // @IsNumber()
    // base_salary: number

    @ApiProperty({ example: '1990-01-30T00:00:00.000Z' })
    @IsISO8601()
    month: string

    @ApiProperty({ example: '1990-01-30T00:00:00.000Z' })
    @IsISO8601()
    year: string

    @ApiProperty({ example: '20' })
    @IsNumber()
    total_working_days: number


    @ApiProperty({ example: 'PKR' })
    @IsEnum(Currency)
    currency: Currency

    @ApiProperty({ example: 'PAID' })
    @IsEnum(PaymentStatus)
    payment_status: PaymentStatus

}
