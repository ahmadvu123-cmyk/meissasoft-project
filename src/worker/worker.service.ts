import { Injectable } from '@nestjs/common';
// import { WorkerController } from '../controllers/worker.controller';
import { WorkerRepository } from './worker.repository';
import { WorkerDto } from './dto/worker.dto';
import { log } from 'console';

@Injectable()
export class WorkerService {
    constructor(private repo: WorkerRepository){}

    async getWorkers(){
        const worker = await  this.repo.findMany();
        return {
            success: true,
            message: 'Workers get successfully',
            data: worker
        }
    }

    async createWorker(dto: WorkerDto){
        const worker = await this.repo.create(dto);
        console.log(worker);
        
        return {
            success: true,
            message: "Worker created successfully.",
            data: worker,
        };
    }

    async updateWorker(workerId: number, dto: WorkerDto){
       const worker = await this.repo.update(workerId, dto);
            return {
                success: true,
                status: 200,
                message: 'Worker updated successfully',
                data: worker
            
            }
    }

    async deleteWorker(workerId: number){
        const worker = await this.repo.delete(workerId);
        return {
                success: true,
                status: 200,
                message: 'Worker deleted successfully',
                data: worker
        }
    }



    
}
