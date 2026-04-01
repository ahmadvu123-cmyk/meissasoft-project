import { Injectable } from '@nestjs/common';
// import { WorkerController } from '../controllers/worker.controller';
import { WorkerRepository } from './worker.repository';
import { WorkerDto } from './dto/worker.dto';

@Injectable()
export class WorkerService {
    constructor(private repo: WorkerRepository){}
    
    async createWorker(dto: WorkerDto){
        return this.repo.create(dto);
    }
}
