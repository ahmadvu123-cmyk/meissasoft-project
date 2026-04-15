import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";


@Injectable()
export class WorkerRepository {
    constructor(private prisma: PrismaService){}

    async findWorker(workerId: number){
        return this.prisma.worker.findUnique({
            where: {id: workerId}
        })
    }

    async findMany(skip: number, take: number){
        return this.prisma.worker.findMany({
            skip,
            take,
            orderBy: { id: 'asc'}
        });
        
    }
    async create(data: Prisma.WorkerCreateInput){
        return this.prisma.worker.create({
            data,
        });
    }
    async update(id: number, data: Prisma.WorkerUpdateInput){
        return this.prisma.worker.update({
            where: { id },
            data,
        })

    }
    async delete(id: number){
        return this.prisma.worker.delete({
            where: { id },
        })
    }

}
