import { Controller, Get, Post, Body, Put, Delete, Param, UseFilters, Res, HttpCode, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { WorkerService } from './worker.service';
import { WorkerDto } from './dto/worker.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception/global-exception.filter';
import { handleError } from 'src/common/helpers/error-handler.helper';




@ApiTags('Worker')
@UseFilters(GlobalExceptionFilter) // Global Exception Filter applies on all functions
@Controller('worker')

export class WorkerController {
    constructor(private workerService: WorkerService){}

    // Global Validation Pipes Applies on all routes

    @Get()
    @ApiOperation({summary: 'Get all Workers'})
    @HttpCode(HttpStatus.CREATED)
    async findWorkers(@Res() res: Response){
        try {
        const workers = await this.workerService.getWorkers();
        return res.json({
            statusCode: HttpStatus.CREATED,
            data: workers
        })
        } catch (error: any) {
            return handleError(res, error);
        }
        }

    @Post()
    @ApiOperation({summary: 'Create a Worker'})
    @HttpCode(HttpStatus.CREATED)
    async createNewWorker(@Body() dto: WorkerDto, @Res() res: Response){
        try {
            const newWorker = await this.workerService.createWorker(dto);
            return res.json({
                statusCode: HttpStatus.CREATED,
                message: 'New worker created'
            })
            
        } catch (error: any) {
            return handleError(res, error);
        }

    }

    @Put(':id')
    @ApiOperation({summary: 'Update a Worker'})
    @HttpCode(HttpStatus.CREATED)
    async updateWorker(@Param('id') id: number , @Body() dto: WorkerDto, @Res() res: Response){
        try {
            const updateWorker = await this.workerService.updateWorker(Number(id), dto);
            return res.json({
                statusCode: HttpStatus.CREATED,
                message: 'Worker updated'
            })
        } catch (error: any) {
            return handleError(res, error);
            
        }

    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a Worker'})
    @HttpCode(HttpStatus.CREATED)
    async deleteWorker(@Param('id') id: number, @Res() res: Response ){
        try {
            const deleteWorker = await this.workerService.deleteWorker(Number(id));
            return res.json({
                statusCode: HttpStatus.CREATED,
                message: 'Worker deleted'
            })
        } catch (error: any) {
            return handleError(res, error)            
        }
    }

    
}
