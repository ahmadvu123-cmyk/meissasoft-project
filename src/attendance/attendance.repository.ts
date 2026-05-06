import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { last } from "rxjs";

@Injectable()
export class AttendanceRepository {
    constructor(private prisma: PrismaService) { }

    // async findLatestAttendance() {
    //     return this.prisma.attendance.findFirst({
    //         orderBy: {
    //             id: 'desc'
    //         }
    //     });
    // }

    async findAllAttendacnes(date: Date) {
        
        return this.prisma.attendance.findMany({
            where: {
                updatedAt: {
                    not: null
                },
                date: {
                    gte: date
                }
            },
            
            include: {
                worker: {
                    select: {
                        name: true,
                    }
                }
            },


        });
    }

    async findAttendancesOfMonth(workerId: number, start: Date, end: Date) {

        return this.prisma.attendance.findMany({
            where: {
                worker_id: workerId,
                date: {
                    gte: start,
                    lte: end
                },
                check_out: {
                    not: null
                }
            }
        })

    }

    async checkWorkerId(workerId: number) {
        return this.prisma.worker.findUnique({
            where: { id: workerId }
        })

    }

    async existingAttendance(workerId: number, start, end) {
        return this.prisma.attendance.findFirst({
            where: {
                worker_id: workerId,
                date: {
                    gte: start,
                    lte: end,
                }

            }
        })
    }

    async currentAttendance(attendanceId: number) {
        return this.prisma.attendance.findUnique({ where: { id: attendanceId } });
    }

    async findMany(skip: number, take: number, where: any) {
        return this.prisma.attendance.findMany({
            where,
            skip,
            take,
            orderBy: { id: 'asc' }
        });
    }
    async create(data: Prisma.AttendanceCreateInput) {
        return this.prisma.attendance.create({
            data,
        })
    }
    async update(id: number, data: Prisma.AttendanceUpdateInput) {
        return this.prisma.attendance.update({
            where: { id },
            data: {
                ...data,
            updatedAt: new Date(),
            }
        })
    }
    async delete(id: number) {
        return this.prisma.attendance.delete({
            where: { id },
        })
    }
}
