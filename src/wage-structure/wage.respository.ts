import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class WageRespository {
    constructor(private prisma: PrismaService){}

    async findMany(){
        return this.prisma.wageStructure.findMany();

    }
    async create(data){
        return this.prisma.wageStructure.create({
            data,
        })
    }
    async update(id: number, data){
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
