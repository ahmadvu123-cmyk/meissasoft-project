import { Controller, Get, Post, Put, Delete, Body, Param, UseFilters, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindDeductionsDto } from './dto/find.deductions.dto';
import { DeductionService } from './deduction.service';
import { AppExceptionHandler } from 'src/common/helpers/app.exception.hander';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception/global-exception.filter';
import { FindDeductionsResponseDto } from './dto/find.deductions.response.dto';
import { CreateDeductionsDto } from './dto/create.deductions.dto';
import { CreateDeductionsResponseDto } from './dto/create.deductions.response.dto';
import { UpdateDeductionsResponseDto } from './dto/update.deductions.response.dto';
import { UpdateDeductionsDto } from './dto/update.deductions.dto';
import { DeleteDeductionsResponseDto } from './dto/delete.deductions.response.dto';

@ApiTags('Deductions')
@UseFilters(GlobalExceptionFilter)  // Global Exception Filter applies on all functions
@Controller('deduction')
export class DeductionController {
    constructor(private deductionService: DeductionService) {}

    // Global Validation Pipes Applies on all routes

    @Get()
    @ApiOkResponse({
        description: 'Get all deductions',
        type: FindDeductionsResponseDto
    })
    @ApiOperation({ summary: 'Get all deductions' })
    async findWageStructures(@Query() query: FindDeductionsDto) {
        try {
            const deductions = await this.deductionService.allDeductions(query);
            return {
                success: true,
                data: deductions
            }
        } catch (error: any) {
            throw new AppExceptionHandler(error);
        }
    }

    @Post()
    @ApiOkResponse({
        description: 'Create a deduction',
        type: CreateDeductionsResponseDto
    })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Create a deduction' })
    async createADeduction(@Body() dto: CreateDeductionsDto) {
        try {
            const newDeduction = await this.deductionService.createDeduction(dto);
            return {
                success: true,
                data: newDeduction
            }
        } catch (error: any) {
            throw new AppExceptionHandler(error);
        }
    }

    @Put(':id')
    @ApiOkResponse({
        description: 'Update a deduction',
        type: UpdateDeductionsResponseDto
    })
    @ApiOperation({ summary: 'Update a deduction' })
    async updateWageStructure(@Param('id') id: number, @Body() dto: UpdateDeductionsDto) {
        try {
            const updateWageStructure = await this.deductionService.updateDeduction(id, dto);
            return {
                success: true,
                data: updateWageStructure
            }
        } catch (error) {
            throw new AppExceptionHandler(error);
        }
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Delete a wage structure',
        type: DeleteDeductionsResponseDto
    })
    @ApiOperation({ summary: 'Delete a wage structure' })
    async deleteWageStructure(@Param('id') id: number) {
        try {
            await this.deductionService.deleteDeduction(Number(id));
            return {
                success: true,
                message: 'Deduction deleted'
            }
        } catch (error: any) {
            throw new AppExceptionHandler(error);
        }
    }
}
