import { Controller, Get, Post, Body, Put, Delete, Param, UseFilters, Res, HttpException } from '@nestjs/common';
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
import { PrismaErrorHandling } from 'src/common/helpers/prisma.error.handling';
import { Prisma } from '@prisma/client';


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
    // @HttpCode(HttpStatus.CREATED)
    async findWorkers(@Res() res: Response){
        try {
        const workers = await this.workerService.getWorkers();
        return res.json({
            success: true,
            data: workers
        })
        } catch (error: any) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) throw PrismaErrorHandling(error); 
            throw new HttpException(error.message || 'Fetch all workers failed', error.status || 500); 
        }
    }

    @Post()
    @ApiOkResponse({
        description: 'Create a worker',
        type: CreateWorkerResponseDto
    })
    @ApiOperation({summary: 'Create a Worker'})
    // @HttpCode(HttpStatus.OK)
    async createNewWorker(@Body() dto: WorkerDto, @Res() res: Response){
        try {
            const newWorker = await this.workerService.createWorker(dto);
            return res.json({
                success: true,
                data: newWorker
            })  
        } catch (error: any) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                throw PrismaErrorHandling(error);
            }
            throw new HttpException(error.message || 'Worker creation failed', error.status || 500);
        }

    }

    @Put(':id')
     @ApiOkResponse({
        description: 'Update a worker',
        type: UpdateWorkerResponseDto
    })
    @ApiOperation({summary: 'Update a Worker'})
    // @HttpCode(HttpStatus.OK)
    async updateWorker(@Param('id') id: number , @Body() dto: UpdateWorkerDto, @Res() res: Response){
        try {
            const updateWorker = await this.workerService.updateWorker(Number(id), dto);
            return res.json({
                success: true,
                data: updateWorker
            })
        } catch (error: any) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                throw PrismaErrorHandling(error);
            }
            throw new HttpException(error.message || 'Worker updation failed', error.status || 500);
        }

    }

    @Delete(':id')
     @ApiOkResponse({
        description: 'Delete a worker',
        type: DeleteWorkerResponseDto
    })
    @ApiOperation({summary: 'Delete a Worker'})
    async deleteWorker(@Param('id') id: number, @Res() res: Response){
        try {
            await this.workerService.deleteWorker(Number(id));
            return res.json({
                success: true,
                message: 'Worker deleted'
            })
        } catch (error: any) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                throw PrismaErrorHandling(error);
            }
            throw new HttpException(error.message || 'Worker deletion failed', error.status || 500);
        }
    }
    
}
