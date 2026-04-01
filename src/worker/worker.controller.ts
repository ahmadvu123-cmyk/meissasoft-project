import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerDto } from './dto/worker.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Worker')
@Controller('worker')

export class WorkerController {
    constructor(private service: WorkerService){}

    @Get()
    getAllWorkers(){
        return this.service.getWorkers();
    }

    @Post()
    @ApiOperation({summary: 'Create a Worker'})
    createNewWorker(@Body() dto: WorkerDto){
        console.log('DTO:', dto);
        return this.service.createWorker(dto);
    }

    @Put(':id')
    updateWorker(@Param('id') id: number , @Body() dto: WorkerDto){
        return this.service.updateWorker(Number(id), dto);

    }

    @Delete(':id')
    deleteWorker(@Param('id') id: number){
        return this.service.deleteWorker(Number(id));

    }

    
}
