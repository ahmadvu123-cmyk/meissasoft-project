import { Controller, Get, Post, Put, Delete, Body, Param, UseFilters, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception/global-exception.filter';
import { WageService } from './wage.service';
import { FindWageResponseDto } from './dto/find.wage.response.dto';
import { CreateWageResponseDto } from './dto/create.wage.response.dto';
import { UpdateWageDto } from './dto/update.wage.dto';
import { DeleteWageResponseDto } from './dto/delete.wage.response.dto';
import { CreateWageDto } from './dto/create.wage.dto';
import { AppExceptionHandler } from 'src/common/helpers/app.exception.hander';
import { FindWageStructure } from './dto/find.wage.structure';
import { UpdateWageResponseDto } from './dto/update.wage.response.dto';


@ApiTags('Wage-Structure')
@UseFilters(GlobalExceptionFilter)  // Global Exception Filter applies on all functions
@Controller('wage-structure')
export class WageStructureController {
    constructor(private wageService: WageService) { }

    // Global Validation Pipes Applies on all routes

    @Get()
    @ApiOkResponse({
        description: 'Get all wage structures',
        type: FindWageResponseDto
    })
    @ApiOperation({ summary: 'Get all wage structures' })
    async findWageStructures(@Query() query: FindWageStructure) {
        try {
            const wageStructures = await this.wageService.allWageStructures(query);
            return {
                success: true,
                data: wageStructures
            }
        } catch (error: any) {
            throw new AppExceptionHandler(error);
        }
    }

    @Post()
    @ApiOkResponse({
        description: 'Create a wage structure',
        type: CreateWageResponseDto
    })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Create a wage structure' })
    async createWageStructure(@Body() dto: CreateWageDto) {
        try {
            const newWageStructure = await this.wageService.createWageStructure(dto);
            return {
                success: true,
                data: newWageStructure
            }
        } catch (error: any) {
            throw new AppExceptionHandler(error);
        }
    }

    @Put(':id')
    @ApiOkResponse({
        description: 'Update a wage structure',
        type: UpdateWageResponseDto
    })
    @ApiOperation({ summary: 'Update a wage structure' })
    async updateWageStructure(@Param('id') id: number, @Body() dto: UpdateWageDto) {
        try {
            const updateWageStructure = await this.wageService.updateWageStructure(Number(id), dto);
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
        type: DeleteWageResponseDto
    })
    @ApiOperation({ summary: 'Delete a wage structure' })
    async deleteWageStructure(@Param('id') id: number) {
        try {
            await this.wageService.deleteWageStructure(Number(id));
            return {
                success: true,
                message: 'Wage structure deleted'
            }
        } catch (error: any) {
            throw new AppExceptionHandler(error);
        }
    }
}
