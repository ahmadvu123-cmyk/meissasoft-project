import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, HttpCode, HttpStatus, HttpException, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './dto/attendance.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception/global-exception.filter';
import { AttendanceResponseDto } from './dto/attendance.response.dto';
import { DeleteAttendanceResponseDto } from './dto/delete.attendance.response.dto';
import { UpdateAttendanceDto } from './dto/update.attendance.dto';
import { UpdateAttendanceResponseDto } from './dto/update.attendance.response.dto';
import { CreateAttendanceResponseDto } from './dto/create.attendance.response.dto';
import { Prisma } from '@prisma/client';
import { GetAttendanceDto } from './dto/get.attendance.dto';
import { AppExceptionHandler } from 'src/common/helpers/app.exception.hander';


@ApiTags('Attendance')
@UseFilters(GlobalExceptionFilter) // Global Exception Filter applies on all functions
@Controller('attendance')
export class AttendanceController {
    constructor(private attendanceService: AttendanceService){}

    // Global Validation Pipes Applies on all routes

    @Get()
    @ApiOkResponse({
        description: 'Get all attendances',
        type: AttendanceResponseDto
    })
    @ApiOperation({summary: 'Get all Attendances'})
    async findAttendances(@Query() query: GetAttendanceDto){
       try {
            const attendances = await this.attendanceService.getAllAttendances(query);
            return {
                success: true,
                data: attendances
            }
       } catch (error: any) {
          throw new AppExceptionHandler(error);
        
       }
    }

    @Post()
    @ApiOkResponse({
        description: 'Create an attendances',
        type: CreateAttendanceResponseDto
    })
    @ApiOperation({summary: 'Create an Attendance'})
    @HttpCode(HttpStatus.OK)
    async createNewAttendance(@Body() dto: AttendanceDto){
        try {
            const newAttendance = await this.attendanceService.createAttendance(dto);
            return {
                success: true,
                data: newAttendance
            }
        } catch (error: any) {
                      throw new AppExceptionHandler(error);

        }
    }

    
    @Put(':id')
    @ApiOkResponse({
        description: 'Update an attendances',
        type: UpdateAttendanceResponseDto
    })
    @ApiOperation({summary: 'Update an Attendance'})
    @HttpCode(HttpStatus.OK)
    async updateAttendance(@Param('id') id: number, @Body() dto: UpdateAttendanceDto){
        
        try {
            const updateAttendance = await this.attendanceService.updateAttendance(Number(id), dto);
            return {
                success: true,
                data: updateAttendance
            }
        } catch (error: any) {
                      throw new AppExceptionHandler(error);


        }
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Delete an attendances',
        type: DeleteAttendanceResponseDto
    })
    @ApiOperation({summary: 'Delete an Attendance'})
    @HttpCode(HttpStatus.OK)
    async deleteAttendance(@Param('id') id: number){
        try {
            const deleteAttendance = await this.attendanceService.deleteAttendance(Number(id));
            return {
                success: true,
                message: 'Attendance deleted'
            }
        } catch (error: any) {
                      throw new AppExceptionHandler(error);

        }
        }
}
