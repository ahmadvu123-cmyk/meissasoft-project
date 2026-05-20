import { Controller, Get, UseFilters, Query, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception/global-exception.filter';
import { PaymentService } from './payment.service';
import { FindPaymentResponseDto } from './dto/find.payment.response.dto';
import { FindPaymentDto } from './dto/find.payment.dto';
import { AppExceptionHandler } from 'src/common/helpers/app.exception.hander';
import { DeletePaymentResponseDto } from './dto/delete.payment.response.dto';

@ApiTags('Payments')
@UseFilters(GlobalExceptionFilter)  // Global Exception Filter applies on all functions
@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    // Global Validation Pipes Applies on all routes

    @Get()
    @ApiOkResponse({
        description: 'Get all payments',
        type: FindPaymentResponseDto
    })
    @ApiOperation({ summary: 'Get all payments' })
    async findWageStructures(@Query() query: FindPaymentDto) {
        try {
            const allPayments = await this.paymentService.allPayments(query);
            return {
                success: true,
                data: allPayments
            }
        } catch (error: any) {
            throw new AppExceptionHandler(error);
        }
    }
    
    @Delete(':id')
    @ApiOkResponse({
        description: 'Delete a payment',
        type: DeletePaymentResponseDto
    })
    @ApiOperation({ summary: 'Delete a payment' })
    async deletePayment(@Param('id') id: number) {
        try {
            await this.paymentService.deletePayment(Number(id));
            return {
                success: true,
                message: 'Payment deleted'
            }
        } catch (error: any) {
            throw new AppExceptionHandler(error);
        }
    }
}
