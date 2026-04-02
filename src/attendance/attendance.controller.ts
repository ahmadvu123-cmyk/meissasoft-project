import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './dto/attendance.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
    constructor(private service: AttendanceService){}

    // Global Validation Pipes Applies on all routes

    @Get()
    @ApiOperation({summary: 'Get all Attendances'})
    findAttendance(){
        return this.service.getAttendances();
    }

    @Post()
    @ApiOperation({summary: 'Create an Attendance'})
    create(@Body() dto: AttendanceDto){
        return this.service.createAttendance(dto);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update an Attendance'})
    update(@Param('id') id: number, @Body() dto: AttendanceDto){
        return this.service.updateAttendance(Number(id), dto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete an Attendance'})
    delete(@Param('id') id: number){
        return this.service.deleteAttendance(Number(id));
    }
}
