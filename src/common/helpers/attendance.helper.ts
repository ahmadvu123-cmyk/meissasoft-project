import { ConflictException, Injectable } from '@nestjs/common';
import { AttendanceRepository } from 'src/attendance/attendance.repository';
@Injectable()

export class AttendanceHelper{
    constructor(private attendanceRepo: AttendanceRepository) {};
    
    async checkAttendance(workerId, date){
        const start = new Date(date);
        start.setUTCHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setUTCHours(23, 59, 59, 999);
        const existingAttendance = await this.attendanceRepo.existingAttendance(workerId, start, end);
            if(existingAttendance) throw new ConflictException('Attendance already exists for this day');
    }

}
