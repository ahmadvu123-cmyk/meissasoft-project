import { Injectable, Param } from '@nestjs/common';
import { WageRespository } from './wage.respository';
import { CreateWageDto } from './dto/create.wage.dto';
import { UpdateWageDto } from './dto/update.wage.dto';

@Injectable()
export class WageService {
    constructor(private wageRepo: WageRespository){}

    async allWageStructures(){
        return this.wageRepo.findMany();
    }

    async createWageStructure(dto: CreateWageDto){
        return this.wageRepo.create(dto);
    }

    async updateWageStructure(wageId: number, dto: UpdateWageDto){
        return this.wageRepo.update(wageId, dto);
        
    }

    async deleteWageStructure(wageId: number){
        return this.wageRepo.delete(wageId);
    }
}
