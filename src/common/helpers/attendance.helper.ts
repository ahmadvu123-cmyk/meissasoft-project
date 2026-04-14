import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()

export class AttendanceHelper{
    constructor(private prisma: PrismaService) {};
    
    async checkAttendance(workerId, date){
        const start = new Date(date);
        start.setUTCHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setUTCHours(23, 59, 59, 999);
        const existingAttendance = await this.prisma.attendance.findFirst({
                where: { 
                    worker_id: workerId, 
                    date: {
                        gte: start,
                        lte: end,
                    }
                }
            })
            if(existingAttendance) throw new ConflictException('Attendance already exists for this day');
    }

}
