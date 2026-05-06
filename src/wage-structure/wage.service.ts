import { Injectable, NotFoundException } from '@nestjs/common';
import { WageRespository } from './wage.respository';
import { CreateWageDto } from './dto/create.wage.dto';
import { UpdateWageDto } from './dto/update.wage.dto';

@Injectable()
export class WageService {
    constructor(private wageRepo: WageRespository) { }

    async allWageStructures(query) {
        const { page = 1, limit = 10 } = query;
        return this.wageRepo.findMany((page - 1) * limit, limit);
    }

    async createWageStructure(dto: CreateWageDto) {
        const { worker_id, ...rest } = dto;

        const checkWorkerId = await this.wageRepo.checkWorkerId(dto.worker_id);
        if (!checkWorkerId) throw new NotFoundException(`Wage Structure not created. No worker id ${dto.worker_id} found`);

        return this.wageRepo.create({
            worker: { connect: { id: worker_id } },
            ...rest

        });
    }

    async updateWageStructure(wageId: number, dto: UpdateWageDto) {
        const { worker_id, ...rest } = dto;
        const checkWageStructure = await this.wageRepo.findWageStructure(wageId);
        if (!checkWageStructure) throw new NotFoundException(`Wage Structure not updated. No wage id ${wageId} found`);

        const checkWorkerId = await this.wageRepo.checkWorkerId(dto.worker_id);
        if (!checkWorkerId) throw new NotFoundException(`Wage Structure not updated. No worker id ${dto.worker_id} found`);

        return this.wageRepo.update(wageId, {
            worker: { connect: { id: worker_id } },
            ...rest
        });

    }

    async deleteWageStructure(wageId: number) {
        const checkWageStructure = await this.wageRepo.findWageStructure(wageId);
        if (!checkWageStructure) throw new NotFoundException(`Wage Structure not updated. No wage id ${wageId} found`);
        return this.wageRepo.delete(wageId);
    }
}
