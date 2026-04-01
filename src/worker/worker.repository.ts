import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { WorkerDto } from "./dto/worker.dto";
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('posts')
@Injectable()
export class WorkerRepository {
    constructor(private prisma: PrismaService){}

    @ApiOperation({summary: 'Create new Worker'})
    async create(data: WorkerDto){
        return this.prisma.worker.create({
            data,
        });
    }
}
