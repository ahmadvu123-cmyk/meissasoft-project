import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkerRepository } from './worker.repository';
import { WorkerDto } from './dto/worker.dto';
import { UpdateWorkerDto } from './dto/update.worker.dto';

@Injectable()
export class WorkerService {
    constructor(private workerRepo: WorkerRepository){}

    async getWorkers(page, limit){
        return this.workerRepo.findMany((page - 1) * limit, limit); 
    }

    async createWorker(dto: WorkerDto) {
        return this.workerRepo.create(dto);
    }

    async updateWorker(workerId: number, dto: UpdateWorkerDto){
        const worker = await this.workerRepo.findWorker(workerId);

        if(!worker) throw new NotFoundException(`Worker with id ${workerId} does not exist. Please try with correct worker id`);
        
        return this.workerRepo.update(workerId, dto);
    }

    async deleteWorker(workerId: number){
        const getWorker = await this.workerRepo.findWorker(workerId);

        if(!getWorker) throw new NotFoundException(`Worker with id ${workerId} does not exist. Please try with correct worker id`);
        
        return this.workerRepo.delete(workerId);
    }
}
