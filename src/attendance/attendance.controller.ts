import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, Res, HttpCode, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './dto/attendance.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception/global-exception.filter';
import { handleError } from 'src/common/helpers/error-handler.helper';


@ApiTags('Attendance')
@UseFilters(GlobalExceptionFilter) // Global Exception Filter applies on all functions
@Controller('attendance')
export class AttendanceController {
    constructor(private attendanceService: AttendanceService){}

    // Global Validation Pipes Applies on all routes

    @Get()
    @ApiOperation({summary: 'Get all Attendances'})
    @HttpCode(HttpStatus.CREATED)
    async findAttendances(@Res() res: Response){
       try {
        const attendances = await this.attendanceService.getAttendances();
        return res.json({
            statusCode: HttpStatus.CREATED,
            data: attendances
        })
       } catch (error: any) {
        return handleError(res, error);
        
       }
    }

    @Post()
    @ApiOperation({summary: 'Create an Attendance'})
    @HttpCode(HttpStatus.CREATED)
    async createNewAttendance(@Body() dto: AttendanceDto, @Res() res: Response){
        try {
            const newAttendance = await this.attendanceService.createAttendance(dto);
            return res.json({
                statusCode: HttpStatus.CREATED,
                message: 'New attendance created'
            })
        } catch (error: any) {
            return handleError(res, error);
        }
    }

    @Put(':id')
    @ApiOperation({summary: 'Update an Attendance'})
    @HttpCode(HttpStatus.CREATED)
    async updateAttendance(@Param('id') id: number, @Body() dto: AttendanceDto, @Res() res: Response){
        try {
            const updateAttendance = await this.attendanceService.updateAttendance(Number(id), dto);
            return res.json({
                statusCode: HttpStatus.CREATED,
                message: 'Attendance updated'
            })
        } catch (error: any) {
            return handleError(res, error);
        }
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete an Attendance'})
    @HttpCode(HttpStatus.CREATED)
    async deleteAttendance(@Param('id') id: number, @Res() res: Response){
        try {
            const deleteAttendance = await this.attendanceService.deleteAttendance(Number(id));
            return res.json({
                statusCode: HttpStatus.CREATED,
                message: 'Attendance deleted'
            }) 
        } catch (error: any) {
            return handleError(res, error);
        }
        }
}
