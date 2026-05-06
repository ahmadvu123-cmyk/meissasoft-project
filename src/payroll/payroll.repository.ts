import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from "@prisma/client";
import { WorkerRepository } from 'src/worker/worker.repository';



@Injectable()
export class PayrollRepository {
    constructor(private prisma: PrismaService) {}

    // async getWorkerById(worker_id: number) {
    //     return this.workerRepo.findWorker(worker_id)
    // }
    // async checkAttendances(workerId: number, start: Date, end: Date) {
    //     return this.prisma.attendance.findMany({
    //         where: {
    //             worker_id: workerId,
    //             createdAt: {
    //                 gte: start,
    //                 lte: end
    //             }
    //         }
    //     });
    // }

    async findlatestPayroll(){
        return this.prisma.payroll.findFirst({
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    async findAllPayrolls(date: Date){
        return this.prisma.payroll.findMany({
            where: {
                createdAt: {
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

    async findPayroll(id: number){
        return this.prisma.payroll.findUnique({
            where: {
                id,
            }
        })
    }

    async createAndUpdatePayrollPayment(payrollId: number ,salary: number, date: string){
        return this.prisma.payments.create({
            data: {
            payroll_id: payrollId,
            salary,
            payment_date: date
            }
            
        })
    }

    async findPayrolls(skip: number, take: number) {
        return this.prisma.payroll.findMany({
            skip,
            take,
            orderBy: { id: 'asc' }
        })
    }
    async createPayroll(data: Prisma.PayrollCreateInput) {
        return this.prisma.payroll.create({
            data
        })
    }
    async updatePayroll(id: number, data: Prisma.PayrollUpdateInput) {
        return this.prisma.payroll.update({
            where: { id },
            data
        })
    }
    async deletePayroll(id: number) {
        return this.prisma.payroll.delete({
            where: { id }
        })
    }
}

