import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerDto } from './dto/worker.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Worker')
@Controller('worker')

export class WorkerController {
    constructor(private service: WorkerService){}

    // Global Validation Pipes Applies on all routes

    @Get()
    @ApiOperation({summary: 'Get all Workers'})
    async getAllWorkers(){
        return this.service.getWorkers();
    }

    @Post()
    @ApiOperation({summary: 'Create a Worker'})
    async createNewWorker(@Body() dto: WorkerDto){
        console.log('DTO:', dto);
        return this.service.createWorker(dto);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update a Worker'})
    async updateWorker(@Param('id') id: number , @Body() dto: WorkerDto){
        return this.service.updateWorker(Number(id), dto);

    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a Worker'})
    async deleteWorker(@Param('id') id: number){
        return this.service.deleteWorker(Number(id));

    }

    
}
