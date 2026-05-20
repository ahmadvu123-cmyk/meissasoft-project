import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class DeductionRepository {
    constructor(private prisma: PrismaService) { }

    async findDeduction(deductionId: number) {
        return this.prisma.deductions.findUnique({
            where: { id: deductionId }
        });
    }

    async findLatestDeduction() {
        return this.prisma.deductions.findFirst();
    }
    async findMany(skip: number, take: number) {
        return this.prisma.deductions.findMany({
            skip,
            take,
            orderBy: { id: 'asc' }
        })
    }
    async createDeduction(data: Prisma.DeductionsCreateInput) {
        return this.prisma.deductions.create({
            data
        });
    }

    async updateDeduction(deductionId: number, data: Prisma.DeductionsUpdateInput) {
        return this.prisma.deductions.update({
            where: { id: deductionId },
            data
        })
    }

    async deleteDeduction(deductionId: number) {
        return this.prisma.deductions.delete({
            where: { id: deductionId }
        })
    }
}
