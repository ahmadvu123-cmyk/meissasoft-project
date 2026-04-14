import { Controller, Get, Post, Put, Delete, Body, Param, UseFilters, Res, HttpException } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception/global-exception.filter';
import { WageService } from './wage.service';
import { FindWageResponseDto } from './dto/find.wage.response.dto';
import { CreateWageResponseDto } from './dto/create.wage.response.dto';
import { UpdateWageDto } from './dto/update.wage.dto';
import { DeleteWageResponseDto } from './dto/delete.wage.response.dto';
import { CreateWageDto } from './dto/create.wage.dto';


@ApiTags('Wage-Structure')
@UseFilters(GlobalExceptionFilter)  // Global Exception Filter applies on all functions
@Controller('wage-structure')
export class WageStructureController {
    constructor(private wageService: WageService){}

    // Global Validation Pipes Applies on all routes

    @Get()
    @ApiOkResponse({
        description: 'Get all wage structures',
        type: FindWageResponseDto
    })
    @ApiOperation({ summary: 'Get all wage structures' })
    async findWageStructures( @Res() res: Response){

        try {
            const wageStructures = await this.wageService.allWageStructures();
            return res.json({
                success: true,
                data: wageStructures
            })
        } catch (error: any) {
            throw new HttpException(error.message || 'Fetch all wage structures failed', error.status || 500);
        }


    }

    @Post()
    @ApiOkResponse({
            description: 'Create a wage structure',
            type: CreateWageResponseDto
        })
    @ApiOperation({summary: 'Create a wage structure'})
    async createWageStructure(@Body() dto: CreateWageDto, @Res() res: Response){
        try {
            const newWageStructure = await this.wageService.createWageStructure(dto);
            return res.json({
                success: true,
                data: newWageStructure
            })
            
        } catch (error: any) {
            
        }


    }

    @Put(':id')
    @ApiOkResponse({
            description: 'Update a wage structure',
            type: CreateWageResponseDto
        })
    @ApiOperation({summary: 'Update a wage structure'})
    async updateWageStructure(@Param('id') id: number, @Body() dto: UpdateWageDto, @Res() res: Response){
        try {
            const updateWageStructure = await this.wageService.updateWageStructure(Number(id), dto);
            return res.json({
                success: true,
                data: updateWageStructure
            })
        } catch (error) {
            
        }        
    }

    @Delete(':id')
    @ApiOkResponse({
            description: 'Delete a wage structure',
            type: DeleteWageResponseDto
        })
    @ApiOperation({summary: 'Delete a wage structure'})
        async deleteWageStructure(@Param('id') id: number, @Res() res: Response){
            try {
                await this.wageService.deleteWageStructure(Number(id));
                return res.json({
                    success: true,
                    message: 'Wage structure deleted'
                })
            } catch (error: any) {
               
            }
        }



}
