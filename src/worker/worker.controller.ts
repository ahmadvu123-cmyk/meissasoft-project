import { Controller, Post, Body } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerDto } from './dto/worker.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Worker')
@Controller('worker')

export class WorkerController {
    constructor(private service: WorkerService){}

    @Post()
    @ApiOperation({summary: 'Create a Worker'})
    create(@Body() dto: WorkerDto){
        console.log('DTO:', dto);
        return this.service.createWorker(dto);
    }
    
}
