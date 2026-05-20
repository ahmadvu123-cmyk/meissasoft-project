import { Injectable, NotFoundException } from '@nestjs/common';
import { DeductionRepository } from './deduction.repository';
import { CreateDeductionsDto } from './dto/create.deductions.dto';
import { UpdateDeductionsDto } from './dto/update.deductions.dto';

@Injectable()
export class DeductionService {
    constructor(private dedcutionRepo: DeductionRepository) { }
    async allDeductions(query) {
        const { page = 1, limit = 10 } = query;
        return this.dedcutionRepo.findMany((page - 1) * limit, limit);
    }

    async createDeduction(dto: CreateDeductionsDto) {
        return this.dedcutionRepo.createDeduction({
            ...dto
        });
    }

    async updateDeduction(deductionId: number, dto: UpdateDeductionsDto) {
        const checkDeduction = await this.dedcutionRepo.findDeduction(deductionId);
        if (!checkDeduction) throw new NotFoundException(`Deduction not updated. No deduction id ${deductionId} found`);
        return this.dedcutionRepo.updateDeduction(deductionId, {
            ...dto
        })
    }

    async deleteDeduction(deductionId: number) {
        const checkDeduction = await this.dedcutionRepo.findDeduction(deductionId);
        if (!checkDeduction) throw new NotFoundException(`Deduction not updated. No deduction id ${deductionId} found`);
        return this.dedcutionRepo.deleteDeduction(deductionId);
    }
}
