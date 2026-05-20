import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { FindPayrollDto } from './dto/find.payroll.dto';
import { PayrollRepository } from './payroll.repository';
import { CreatePayrollDto } from './dto/create.payroll.dto';
import { UpdatePayrollDto } from './dto/update.payroll.dto';
import { WorkerRepository } from 'src/worker/worker.repository';
import { checkPayrollInMonth } from 'src/common/helpers/check.payroll';
import { AttendanceRepository } from 'src/attendance/attendance.repository';
import { calculateOverTimeHours } from 'src/common/helpers/calculate.overtime.hours';
import { WageRespository } from 'src/wage-structure/wage.respository';
import { DeductionRepository } from 'src/deductions/deduction.repository';
import { calculateNetSalary } from 'src/common/helpers/calculate.net.salary';
import { PaymentRepository } from 'src/payments/payment.repository';
import { Prisma } from 'generated/prisma/browser';




@Injectable()
export class PayrollService {
    constructor(private payrollRepo: PayrollRepository, private workerRepo: WorkerRepository, 
                private attendanceRepo: AttendanceRepository, private wageRepo: WageRespository,
                private deductionRepo: DeductionRepository, private paymentRepo: PaymentRepository
            ) {}

    async allPayrolls(query: FindPayrollDto) {
        const { page = 1, limit = 10, search } = query;
        const whereCondition = search
        ? {
              worker: {
                  name: {
                      contains: search,
                      mode: 'insensitive'
                  }
              }
          }
        : {};
        const payrolls = await this.payrollRepo.findPayrolls((page - 1) * limit, limit, whereCondition);
        const totalPayrolls = await this.payrollRepo.countTotalPayrolls(whereCondition);
           
        const totalPages = Math.ceil(totalPayrolls / limit);
        
        return {
            payrolls,
            totalPages
        }
    }

    async createPayroll(dto: CreatePayrollDto) {
        const { worker_id, ...rest } = dto;
        // if(error.code == "P2002") throw new ConflictException(`Payroll already exists against ${worker_id} worker id`)
        if(new Date(dto.month).getTime() !== new Date(dto.year).getTime()){
            throw new BadRequestException('Month and year should be same');
        }
        const getWorkerById = await this.workerRepo.findWorker(worker_id)
        if (!getWorkerById) throw new NotFoundException(`Payroll not created. Worker id ${worker_id} does not exist`);
        const { start, end, month, year } = checkPayrollInMonth(dto.year);
        const getAttendancesOfMonth = await this.attendanceRepo.findAttendancesOfMonth(worker_id, start, end);
        if (getAttendancesOfMonth.length === 0) throw new NotFoundException(`No attendances found in ${month} month of ${year} year`);
        
        const days_present = getAttendancesOfMonth.length;
        const absent_days = dto.total_working_days - days_present;
        const overTimeHours = calculateOverTimeHours(getAttendancesOfMonth);

        const findWageByWorkerId = await this.wageRepo.findWageByWorkerId(worker_id);
        if (!findWageByWorkerId) throw new NotFoundException(`No wage found against this worker id${worker_id}`);
        const base_salary = findWageByWorkerId.base_salary;


        const getTaxDeduction = await this.deductionRepo.findLatestDeduction();
        if(!getTaxDeduction) throw new NotFoundException('Deduction not found');

        const {netSalary, overTimePay, totalDeductions} = calculateNetSalary(base_salary, overTimeHours, days_present, getTaxDeduction.tax_percentage);

        const createPayroll = await this.payrollRepo.createPayroll({
            base_salary,
            absent_days,
            days_present,
            overtime_hours: overTimeHours,
            overtime_pay: overTimePay,
            total_deductions: totalDeductions,
            net_salary: netSalary,
            ...rest,
            worker: { connect: { id: worker_id}},
        });
        if(createPayroll) await this.paymentRepo.createPayment(createPayroll.id, netSalary, dto.month);
        return createPayroll;
    }

    async updatePayroll(payrollId: number, dto: UpdatePayrollDto) {
        const { worker_id } = dto;

        const findWorkerById = await this.workerRepo.findWorker(worker_id);
        if(!findWorkerById) throw new NotFoundException(`No worker found against this worker id ${worker_id}`)

        const findPayrollById = await this.payrollRepo.findPayroll(payrollId);
        if(!findPayrollById) throw new NotFoundException(`No payroll found against this payroll id ${payrollId}`);

        const totalWorkingDays = dto.total_working_days || findPayrollById.total_working_days;
        const overTimeHours = dto.overtime_hours || findPayrollById.overtime_hours || 0;
        const totalDeduction = dto.total_deduction || findPayrollById.total_deductions || 0;
        const daysPresent = dto.days_present || findPayrollById.days_present || 0;
        const currencyType = dto.currency || findPayrollById.currency;
        const paymentStatus = dto.payment_status || findPayrollById.payment_status;
        const baseSalary = dto.base_salary || findPayrollById.base_salary;
        const absent_days = totalWorkingDays - daysPresent;

        const {netSalary, overTimePay, totalDeductions} = calculateNetSalary(baseSalary, overTimeHours, daysPresent, totalDeduction);

        const updatePayroll = await this.payrollRepo.updatePayroll(payrollId, {
            total_working_days: totalWorkingDays,
            absent_days,
            overtime_hours: overTimeHours,
            total_deductions: totalDeductions,
            days_present: daysPresent,
            currency: currencyType,
            payment_status: paymentStatus,
            base_salary: baseSalary,
            overtime_pay: overTimePay,
            net_salary: netSalary,
            worker: { connect: { id: worker_id } },

        });

        const findPaymentByPayrollId = await this.paymentRepo.findPaymentByPayrollId(updatePayroll.id);
        if(!findPaymentByPayrollId) throw new NotFoundException(`No payment found with payroll id ${updatePayroll.id}`);

        if(updatePayroll) await this.paymentRepo.updatePayment(findPaymentByPayrollId.id, updatePayroll.id, netSalary, updatePayroll.month);
        return updatePayroll;


    }
    async deletePayroll(payrollId: number) {
        return this.payrollRepo.deletePayroll(payrollId);

    }
}
