import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class WageRespository {
    constructor(private prisma: PrismaService){}

    async findWageByWorkerId(workerId: number){
        return this.prisma.wageStructure.findUnique({
            where: { worker_id: workerId}
        });
    }

    async findWageStructure(wageId: number){
        return this.prisma.wageStructure.findUnique({
            where: { id: wageId}
        })
    }

    async checkWorkerId(workerId: number){
        return this.prisma.worker.findUnique({
            where: {id: workerId}
        })
    }

    async findMany(skip: number, take: number){
        return this.prisma.wageStructure.findMany({
            skip,
            take,
            orderBy: { id: 'asc'}
        });

    }
    async create(data: Prisma.WageStructureCreateInput){
        return this.prisma.wageStructure.create({
            data,
        })
    }
    async update(id: number, data: Prisma.WageStructureUpdateInput){
        return this.prisma.wageStructure.update({
            where: {id},
            data
        })
    }
    async delete(id: number){
        return this.prisma.wageStructure.delete({
            where: {id}
        })
    }
}
