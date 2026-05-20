import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkerRepository } from './worker.repository';
import { WorkerDto } from './dto/worker.dto';
import { UpdateWorkerDto } from './dto/update.worker.dto';
import { Role } from '@prisma/client';



@Injectable()
export class WorkerService {
    constructor(private workerRepo: WorkerRepository) { }

    async getWorkers(page: number, limit: number, search: string) {
        const isBoolean = search === 'true' || search === 'false';
        const whereCondition = search ? {
            OR: [
                {
                    name: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    phone_num: {
                        contains: search,
                    },
                },
                {
                    cnic: {
                        contains: search,
                    },
                },
                ...(Object.values(Role).includes(search as Role)
                    ? [{ role: { equals: search as Role } }]
                    : []),
                {
                    is_permanent: {
                        equals:
                            search === 'true'
                                ? true
                                : search === 'false'
                                    ? false
                                    : undefined,
                    },
                },
            ],

        } : undefined;
        const workers = await this.workerRepo.findMany((page - 1) * limit, limit, whereCondition);
        const totalWorkers = await this.workerRepo.countTotalWorkers(whereCondition);
        const totalPages = Math.ceil(totalWorkers / limit);
        return {
            workers,
            totalPages
        }
    }

    async createWorker(dto: WorkerDto) {
        return this.workerRepo.create(dto);
    }

    async updateWorker(workerId: number, dto: UpdateWorkerDto) {
        const worker = await this.workerRepo.findWorker(workerId);
        if (!worker) throw new NotFoundException(`Worker with id ${workerId} does not exist. Please try with correct worker id`);
        return this.workerRepo.update(workerId, dto);
    }

    async deleteWorker(workerId: number) {
        const getWorker = await this.workerRepo.findWorker(workerId);
        if (!getWorker) throw new NotFoundException(`Worker with id ${workerId} does not exist. Please try with correct worker id`);
        return this.workerRepo.delete(workerId);
    }
}
