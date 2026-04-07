import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { AttendanceDto } from './dto/attendance.dto';
import { log } from 'console';

@Injectable()
export class AttendanceService {
    constructor(private attendanceRepo: AttendanceRepository){}
        
    async getAttendances(){

        return this.attendanceRepo.findMany();
            
    }

    async createAttendance(dto: AttendanceDto){
        console.log(dto);
        
        
        return this.attendanceRepo.create({
            date: new Date(dto.date),
            check_in: new Date(new Date(`${dto.date}T${dto.check_in}`).toISOString()),
            check_out: dto.check_out ? new Date(new Date(`${dto.date}T${dto.check_out}`).toISOString()) : null,
            total_hours: dto.total_hours,
            overtime_hours: dto.overtime_hours,
            attendence_status: dto.attendence_status,
            worker: { connect: { id: dto.worker_id}}
        });
    }

    async updateAttendance(attendanceId: number, dto: AttendanceDto){
        return this.attendanceRepo.update(attendanceId, {
            date: new Date(dto.date),
            check_in: new Date(`1970-01-01T${dto.check_in}:00Z`),
            check_out: dto.check_out
            ? new Date(`1970-01-01T${dto.check_out}:00Z`): null,
            total_hours: dto.total_hours,
            overtime_hours: dto.overtime_hours,
            attendence_status: dto.attendence_status,
            worker: { connect: { id: dto.worker_id}}
        })
    }

    async deleteAttendance(attendanceId: number){
        return this.attendanceRepo.delete(attendanceId);
    }

}
    

