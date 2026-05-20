import { Controller, Get, Post, Body, Put, Delete, Param, UseFilters, Res, HttpException, HttpCode, HttpStatus, Query } from '@nestjs/common';
import type { Response } from 'express';
import { WorkerService } from './worker.service';
import { WorkerDto } from './dto/worker.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception/global-exception.filter';
import { WorkerResponseDto } from './dto/worker.response.dto';
import { DeleteWorkerResponseDto } from './dto/delete.worker.response.dto';
import { UpdateWorkerDto } from './dto/update.worker.dto';
import { UpdateWorkerResponseDto } from './dto/update.worker.response.dto';
import { CreateWorkerResponseDto } from './dto/create.worker.response.dto';
import { GetWorkersDto } from './dto/get.workers.dto';
import { AppExceptionHandler } from 'src/common/helpers/app.exception.hander';


@ApiTags('Worker')
@UseFilters(GlobalExceptionFilter) // Global Exception Filter applies on all functions
@Controller('worker')

export class WorkerController {
    constructor(private workerService: WorkerService){}

    // Global Validation Pipes Applies on all routes

    @Get()
    @ApiOkResponse({
        description: 'Get all workers',
        type: WorkerResponseDto
    })
    @ApiOperation({summary: 'Get all Workers'})
    async findWorkers( @Query() query: GetWorkersDto){
        const { page = 1, limit = 10, search } = query;
        try {
        const workers = await this.workerService.getWorkers(Number(page), Number(limit), search);
        return {
            success: true,
            data: workers
        }
        } catch (error: any) {
            console.log(error);
            throw new AppExceptionHandler(error);
        }
    }

    @Post()
    @ApiOkResponse({
        description: 'Create a worker',
        type: CreateWorkerResponseDto
    })
    @ApiOperation({summary: 'Create a Worker'})
    @HttpCode(HttpStatus.OK)
    async createNewWorker(@Body() dto: WorkerDto){
        try {
            const newWorker = await this.workerService.createWorker(dto);
            return {
                success: true,
                data: newWorker
            }  
        } catch (error: any) {
            console.log(error);
            throw new AppExceptionHandler(error);
        }

    }

    @Put(':id')
     @ApiOkResponse({
        description: 'Update a worker',
        type: UpdateWorkerResponseDto
    })
    @ApiOperation({summary: 'Update a Worker'})
    async updateWorker(@Param('id') id: number , @Body() dto: UpdateWorkerDto){
        try {
            const updateWorker = await this.workerService.updateWorker(Number(id), dto);
            return {
                success: true,
                data: updateWorker
            }
        } catch (error: any) {
            console.log(error);
            throw new AppExceptionHandler(error);
        }

    }

    @Delete(':id')
     @ApiOkResponse({
        description: 'Delete a worker',
        type: DeleteWorkerResponseDto
    })
    @ApiOperation({summary: 'Delete a Worker'})
    async deleteWorker(@Param('id') id: number){
        try {
            await this.workerService.deleteWorker(Number(id));
            return {
                success: true,
                message: 'Worker deleted'
            }
        } catch (error: any) {
            throw new AppExceptionHandler(error);
        }
    }
    
}
