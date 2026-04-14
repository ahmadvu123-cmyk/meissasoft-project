import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AttendanceRepository {
    constructor(private prisma: PrismaService){}

    async create(data: any){
        return this.prisma.attendance.create({
            data,
        })
    }

    async findMany(){
        return this.prisma.attendance.findMany();
    }
    async update(id: number, data: any){  
        return this.prisma.attendance.update({
            where: { id },
            data,
        })
    }
    async delete(id: number){
        return this.prisma.attendance.delete({
            where: { id },
        })
    }
}
