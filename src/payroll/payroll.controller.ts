import { Controller, Get, Post, Put, Delete, Body, Param, UseFilters, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception/global-exception.filter';
import { AppExceptionHandler } from 'src/common/helpers/app.exception.hander';
import { PayrollService } from './payroll.service';
import { FindPayrollDto } from './dto/find.payroll.dto';
import { CreatePayrollResponseDto } from './dto/create.payroll.response.dto';
import { CreatePayrollDto } from './create.payroll.dto';
import { UpdatePayrollResponseDto } from './dto/update.payroll.response.dto';
import { UpdatePayrollDto } from './dto/update.payroll.dto';
import { DeletePayrollResponseDto } from './dto/delete.payroll.response.dto';
import { FindPayrollResponseDto } from './dto/find.payroll.response.dto';



@ApiTags('Payroll')
@UseFilters(GlobalExceptionFilter)  // Global Exception Filter applies on all functions
@Controller('payroll')

export class PayrollController {
    constructor(private payrollService: PayrollService) { }

    @Get()
    @ApiOkResponse({
        description: 'Get all payrolls',
        type: FindPayrollResponseDto
    })
    @ApiOperation({ summary: 'Get all payrolls' })
    async findPayrolls(@Query() query: FindPayrollDto) {

        try {
            const payrolls = await this.payrollService.allPayrolls(query);
            return {
                success: true,
                data: payrolls
            }
        } catch (error: any) {
            throw new AppExceptionHandler(error);
        }
    }

    @Post()
    @ApiOkResponse({
        description: 'Create a payroll',
        type: CreatePayrollResponseDto
    })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Create a payroll' })
    async createPayroll(@Body() dto: CreatePayrollDto) {
        try {
            const newPayroll = await this.payrollService.createPayroll(dto);
            return {
                success: true,
                data: newPayroll
            }

        } catch (error: any) {
            console.log(error);

            throw new AppExceptionHandler(error);
        }


    }

    @Put(':id')
    @ApiOkResponse({
        description: 'Update a payroll',
        type: UpdatePayrollResponseDto
    })
    @ApiOperation({ summary: 'Update a payroll' })
    async updatePayroll(@Param('id') id: number, @Body() dto: UpdatePayrollDto) {
        try {
            const updatePayroll = await this.payrollService.updatePayroll(Number(id), dto);
            return {
                success: true,
                data: updatePayroll
            }
        } catch (error) {
            console.log(error);
            throw new AppExceptionHandler(error);
        }
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Delete a payroll',
        type: DeletePayrollResponseDto
    })
    @ApiOperation({ summary: 'Delete a payroll' })
    async deletePayroll(@Param('id') id: number) {
        try {
            await this.payrollService.deletePayroll(Number(id));
            return {
                success: true,
                message: 'Payroll deleted'
            }
        } catch (error: any) {
            throw new AppExceptionHandler(error);
        }
    }
}
