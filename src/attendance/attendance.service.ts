import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { AttendanceDto } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
    constructor(private repo: AttendanceRepository){}
        
    async getAttendances(){
       try {
         const attendances = await this.repo.findMany();

        return {
            success: true,
            status: 200,
            message: "All Worker Attendances",
            data: attendances,
        }
       } catch (error) {
        return {
            error: true,
            status: error.status,
            message: error.message,
        }
        
       }
            
    }

    async createAttendance(dto: AttendanceDto){
        try {
            const attendance = await this.repo.create(dto);

            return {
                success: true,
                status: 200,
                message: 'Attendance created successfully',
                data: attendance
            }
        } catch (error) {
            return {
                error: true,
                status: error.status,
                message: error.message
            }
            
        }

        }

    async updateAttendance(attendanceId: number, dto: AttendanceDto){
        try {
            const attendance = await this.repo.update(attendanceId, dto);
            return {
                success: true,
                status: 200,
                message: 'Attendance updated successfully',
                data: attendance
            }

            
        } catch (error) {
            return {
                error: true,
                status: error.status,
                message: error.message,
            }
        }
    }

    async deleteAttendance(attendanceId: number){
        try {
            const attendance = await this.repo.delete(attendanceId);
            return {
                success: true,
                status: 200,
                message: 'Attendance deleted successfully',
                data: attendance
            }
            
        } catch (error) {
            return {
                error: true,
                status: error.status,
                message: error.messagel
            }
        }
    }

}
    

