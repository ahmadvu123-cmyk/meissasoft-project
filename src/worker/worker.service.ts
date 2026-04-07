import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { WorkerRepository } from './worker.repository';
import { WorkerDto } from './dto/worker.dto';
import { error } from 'node:console';

@Injectable()
export class WorkerService {
    constructor(private workerRepo: WorkerRepository){}

    async getWorkers(){
        return this.workerRepo.findMany();
    }

    async createWorker(dto: WorkerDto){
        return this.workerRepo.create(dto);
    }

    async updateWorker(workerId: number, dto: WorkerDto){
       return this.workerRepo.update(workerId, dto);
    }

    async deleteWorker(workerId: number){
        return this.workerRepo.delete(workerId);
    }



    
}
