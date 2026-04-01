import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AttendanceDto } from "./dto/attendance.dto";


export class AttendanceRepository {
    constructor(private prisma: PrismaService){}

    async create(data: AttendanceDto){
        return await this.prisma.attendance.create({
            data,
        })

    }

    async findMany(){

    }
    async update(id: number, data: AttendanceDto){

    }
    async delete(id: number){}
}
