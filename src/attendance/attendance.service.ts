import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { AttendanceDto } from './dto/attendance.dto';
import { UpdateAttendanceDto } from './dto/update.attendance.dto';
import { calculateOverTime } from 'src/common/helpers/calculate.overtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { compareDate } from 'src/common/helpers/date.compare.helper';
import { AttendanceHelper } from 'src/common/helpers/attendance.helper';



@Injectable()
export class AttendanceService {
    constructor(private attendanceRepo: AttendanceRepository, private prisma: PrismaService, private attendanceHelper: AttendanceHelper){}
        
    async getAllAttendances(){
        return await this.attendanceRepo.findMany();
    }
    
    async createAttendance(dto: AttendanceDto){
        const { worker_id, ...rest } = dto;
        if(worker_id && dto.date){
            await this.attendanceHelper.checkAttendance(worker_id, dto.date);
        }
        
        if(dto.date.substring(0, 10) !== dto.check_in.substring(0, 10)){
            throw new BadRequestException('Date and check_in must be of same day');
        }
        const checkWorker = await this.prisma.worker.findUnique({ where: {id: worker_id}});
        
        if(!checkWorker) throw new NotFoundException(`Attendance not created. No worker id ${worker_id} found`);
            return this.attendanceRepo.create({
                worker: { connect: { id: worker_id}},
                ...rest
            });
    }
    

    async updateAttendance(attendanceId: number, dto: UpdateAttendanceDto){
        const { date, check_in, check_out, worker_id, ...rest } = dto;
        const currentAttendance = await this.prisma.attendance.findUnique({
            where: {
                id: attendanceId, 
            }

        })
        if(!currentAttendance) throw new NotFoundException(`Attendance id ${attendanceId} not found. Please try with correct id`);
        console.log(currentAttendance);
        const checkIn = check_in ?? currentAttendance?.check_in;
        const checkOut = check_out ?? currentAttendance?.check_out;
        const attendanceDate = date ?? currentAttendance?.date;
        
        compareDate(checkIn, checkOut, attendanceDate);

        const checkWorker = await this.prisma.worker.findUnique({ where: {id: worker_id}});
        
        if(!checkWorker) throw new NotFoundException(`Attendance not updated. No worker id ${worker_id} found`);

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
        const getAttendance = await this.prisma.attendance.findUnique({
            where: { id: attendanceId }
        })
        if(!getAttendance) throw new NotFoundException(`Attendance id ${attendanceId} not found. Please try with correct id`);
        return this.attendanceRepo.delete(attendanceId);
    }

}
    

