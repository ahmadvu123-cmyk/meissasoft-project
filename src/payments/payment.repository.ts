import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PaymentRepository {
    constructor(private prisma: PrismaService) { }

    async findMany(skip: number, take: number) {
        return this.prisma.payments.findMany({
            skip,
            take,
            orderBy: { id: 'asc' }
        });
    }

    async createPayment(payrollId: number, salary: number, date: string) {
        return this.prisma.payments.create({
            data: {
                payroll_id: payrollId,
                salary,
                payment_date: date
            }
        })
    }

    async findPaymentByPayrollId(payrollId: number) {
        return this.prisma.payments.findUnique({
            where: { payroll_id: payrollId }
        })
    }

    async updatePayment(id: number, payrollId: number, salary: number, date: string) {
        return this.prisma.payments.update({
            where: { id: id },
            data: {
                payroll_id: payrollId,
                salary: salary,
                payment_date: date
            }
        })
    }

    async deletePayment(paymentId: number) {
        return this.prisma.payments.delete({
            where: { id: paymentId }
        })
    }

    async findAPayment(paymentId: number) {
        return this.prisma.payments.findUnique({
            where: { id: paymentId }
        })
    }
}
