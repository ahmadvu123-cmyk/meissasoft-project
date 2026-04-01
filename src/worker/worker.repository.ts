import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { WorkerDto } from "./dto/worker.dto";
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@Injectable()
export class WorkerRepository {
    constructor(private prisma: PrismaService){}

    async findMany(){
        return this.prisma.worker.findMany();
    }
    async create(data: WorkerDto){
        return this.prisma.worker.create({
            data,
        });
    }
    async update(id: number, data: WorkerDto){
        return this.prisma.worker.update({
            where: { id },
            data,
        })

    }
    async delete(id: number){
        return this.prisma.worker.delete({
            where: { id },
        }
        )
    }

}
