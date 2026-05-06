import { BadRequestException, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { AttendanceDto } from './dto/attendance.dto';
import { UpdateAttendanceDto } from './dto/update.attendance.dto';
import { calculateOverTime } from 'src/common/helpers/calculate.overtime';
import { compareDate } from 'src/common/helpers/date.compare.helper';
import { checkAttendance } from 'src/common/helpers/attendance.helper';
import { GetAttendanceDto } from './dto/get.attendance.dto';



@Injectable()
export class AttendanceService {
    constructor(private attendanceRepo: AttendanceRepository){}
        
    async getAllAttendances(query: GetAttendanceDto){
        const { worker_id, page = 1, limit = 10, start_date, end_date} = query;
        const skip = (page - 1) * limit;
        const where: any = {
            worker_id,
        }
        if(start_date || end_date){
            where.date = {
                ...(start_date && { gte: new Date(start_date) }),
                ...(end_date && { lte: new Date(end_date) }),

            }
        }
        return await this.attendanceRepo.findMany(skip, limit, where);
    }
    
    async createAttendance(dto: AttendanceDto){
        const { worker_id, ...rest } = dto;

        const {start, end} = await checkAttendance(dto.date);
        
        const existingAttendance = await this.attendanceRepo.existingAttendance(worker_id, start, end);
        // console.log(existingAttendance);
        
        
        if(existingAttendance) throw new ConflictException('Attendance already exists for this day');
        
        if(dto.date.substring(0, 10) !== dto.check_in.substring(0, 10)){
            throw new BadRequestException('Date and check_in must be of same day');
        }

        const checkWorker = await this.attendanceRepo.checkWorkerId(worker_id);
        console.log("checkWorker", checkWorker);
        
        
        if(!checkWorker) throw new NotFoundException(`Attendance not created. No worker id ${worker_id} found`);
        
        return this.attendanceRepo.create({
            worker: { connect: { id: worker_id}},
            ...rest
        });
    }
    

    async updateAttendance(attendanceId: number, dto: UpdateAttendanceDto){
        const { date, check_in, check_out, worker_id, ...rest } = dto;

        const checkWorker = await this.attendanceRepo.checkWorkerId(worker_id);
        
        if(!checkWorker) throw new NotFoundException(`Attendance not updated. No worker id ${worker_id} found`);

        const currentAttendance = await this.attendanceRepo.currentAttendance(attendanceId);
        
        if(!currentAttendance) throw new NotFoundException(`Attendance id ${attendanceId} not found. Please try with correct id`);
        
        console.log(currentAttendance);
        
        const checkIn = check_in ?? currentAttendance?.check_in;
        
        const checkOut = check_out ?? currentAttendance?.check_out;
        
        const attendanceDate = date ?? currentAttendance?.date;
        
        compareDate(checkIn, checkOut, attendanceDate);

        

        let totalHours;
        let overTimeHours;
        
        
        if( checkIn && check_out){
            console.log("check");
            
            totalHours = await calculateOverTime(checkIn, check_out);
            console.log(totalHours);
            
            overTimeHours = totalHours - 8;
            overTimeHours = Number(overTimeHours.toFixed(1));
            console.log(overTimeHours);
                
        }
        if(overTimeHours < 0) overTimeHours = 0;
        return this.attendanceRepo.update(attendanceId, {
            date,
            check_in: checkIn,
            check_out,
            total_hours: totalHours,
            overtime_hours: overTimeHours,
            worker: { connect: { id: worker_id}},
            ...rest
        })
    }

    async deleteAttendance(attendanceId: number){
        const getAttendance = await this.attendanceRepo.currentAttendance(attendanceId);
        if(!getAttendance) throw new NotFoundException(`Attendance id ${attendanceId} not found. Please try with correct id`);
        return this.attendanceRepo.delete(attendanceId);
    }

}
    

