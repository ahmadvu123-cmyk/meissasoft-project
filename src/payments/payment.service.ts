import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PaymentService {
    constructor (private paymentRepo: PaymentRepository){}

    async allPayments(query) {
        const { page = 1, limit = 10 } = query;
        return this.paymentRepo.findMany((page - 1) * limit, limit);
    }

    async deletePayment(paymentId: number){
        const findPaymentById = await this.paymentRepo.deletePayment(paymentId);
        if(!findPaymentById) throw new NotFoundException(`Payment does not deleted. No payment id ${paymentId} found`);
        return this.paymentRepo.deletePayment(paymentId);
    }
}
