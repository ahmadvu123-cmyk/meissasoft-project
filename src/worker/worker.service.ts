import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { WorkerRepository } from './worker.repository';
import { WorkerDto } from './dto/worker.dto';
import { UpdateWorkerDto } from './dto/update.worker.dto';
import { empty } from '@prisma/client/runtime/library';
import { isEmpty } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WorkerService {
    constructor(private workerRepo: WorkerRepository, private prisma: PrismaService){}

    async getWorkers(){
        return this.workerRepo.findMany(); 
    }

    async createWorker(dto: WorkerDto) {
        return this.workerRepo.create(dto);
    }

    async updateWorker(workerId: number, dto: UpdateWorkerDto){
        const worker = await this.prisma.worker.findUnique({
            where: { id: workerId }
        })

        if(!worker) throw new NotFoundException(`Worker with id ${workerId} does not exist. Please try with correct worker id`);
        
        return this.workerRepo.update(workerId, dto);
    }

    async deleteWorker(workerId: number){
        const getWorker = await this.prisma.worker.findUnique({
            where: { id: workerId }
        })

        if(!getWorker) throw new NotFoundException(`Worker with id ${workerId} does not exist. Please try with correct worker id`);
        
        return this.workerRepo.delete(workerId);
    }
}
