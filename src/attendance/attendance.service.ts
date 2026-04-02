import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { AttendanceDto } from './dto/attendance.dto';
import { log } from 'console';
import { connect } from 'http2';

@Injectable()
export class AttendanceService {
    constructor(private repo: AttendanceRepository){}
        
    async getAttendances(){

        const attendances = await this.repo.findMany();
        return {
            success: true,
            status: 200,
            message: "All Worker Attendances",
            data: attendances,
        }
            
    }

    async createAttendance(dto: AttendanceDto){
        
        const attendance = await this.repo.create({
            date: new Date(dto.date),
            check_in: new Date(`1970-01-01T${dto.check_in}:00Z`),
            check_out: dto.check_out
            ? new Date(`1970-01-01T${dto.check_out}:00Z`): null,
            total_hours: dto.total_hours,
            overtime_hours: dto.overtime_hours,
            attendence_status: dto.attendence_status,
            worker: { connect: { id: dto.worker_id}}
        });
            

            return {
                success: true,
                status: 200,
                message: 'Attendance created successfully',
                data: attendance
            }
        }

    async updateAttendance(attendanceId: number, dto: AttendanceDto){
        const attendance = await this.repo.update(attendanceId, {
             date: new Date(dto.date),
            check_in: new Date(`1970-01-01T${dto.check_in}:00Z`),
            check_out: dto.check_out
            ? new Date(`1970-01-01T${dto.check_out}:00Z`): null,
            total_hours: dto.total_hours,
            overtime_hours: dto.overtime_hours,
            attendence_status: dto.attendence_status,
            worker: { connect: { id: dto.worker_id}}
        })

        return {
                success: true,
                status: 200,
                message: 'Attendance updated successfully',
                data: attendance
            }
       
    }

    async deleteAttendance(attendanceId: number){
        const attendance = await this.repo.delete(attendanceId);
            return {
                success: true,
                status: 200,
                message: 'Attendance deleted successfully',
                data: attendance
            }
    }

}
    

