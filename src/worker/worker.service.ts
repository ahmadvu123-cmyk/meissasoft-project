import { Injectable } from '@nestjs/common';
// import { WorkerController } from '../controllers/worker.controller';
import { WorkerRepository } from './worker.repository';
import { WorkerDto } from './dto/worker.dto';
import { log } from 'console';

@Injectable()
export class WorkerService {
    constructor(private repo: WorkerRepository){}
    
    async createWorker(dto: WorkerDto){
        const worker = await this.repo.create(dto);
        console.log(worker);
        
        return {
            success: true,
            message: "Worker created successfully.",
            data: worker,
        };
    }
}
