import { Body, Controller, Delete, Get, Param, Post, Put, Patch, UseFilters, Res, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import type { Response } from 'express';
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
import { PrismaErrorHandling } from 'src/common/helpers/prisma.error.handling';


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
    @HttpCode(HttpStatus.OK)
    async findAttendances(@Res() res: Response){
       try {
            const attendances = await this.attendanceService.getAllAttendances();
            return res.json({
                success: true,
                data: attendances
            })
       } catch (error: any) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                throw PrismaErrorHandling(error);
            }
            throw new HttpException(error.message || 'Fetch all attendances failed', error.status || 500);
        
       }
    }

    @Post()
    @ApiOkResponse({
        description: 'Create an attendances',
        type: CreateAttendanceResponseDto
    })
    @ApiOperation({summary: 'Create an Attendance'})
    @HttpCode(HttpStatus.OK)
    async createNewAttendance(@Body() dto: AttendanceDto, @Res() res: Response){
        try {
            const newAttendance = await this.attendanceService.createAttendance(dto);
            return res.json({
                success: true,
                data: newAttendance
            })
        } catch (error: any) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                throw PrismaErrorHandling(error);
            }
            throw new HttpException(error.message || 'Attendance creation failed', error.status || 500);
        }
    }

    
    @Put(':id')
    @ApiOkResponse({
        description: 'Update an attendances',
        type: UpdateAttendanceResponseDto
    })
    @ApiOperation({summary: 'Update an Attendance'})
    @HttpCode(HttpStatus.OK)
    async updateAttendance(@Param('id') id: number, @Body() dto: UpdateAttendanceDto, @Res() res: Response){
        
        try {
            const updateAttendance = await this.attendanceService.updateAttendance(Number(id), dto);
            return res.json({
                success: true,
                data: updateAttendance
            })
        } catch (error: any) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                throw PrismaErrorHandling(error);
            }
            throw new HttpException(error.message || 'Attendance updation failed', error.status || 500);

        }
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Delete an attendances',
        type: DeleteAttendanceResponseDto
    })
    @ApiOperation({summary: 'Delete an Attendance'})
    @HttpCode(HttpStatus.OK)
    async deleteAttendance(@Param('id') id: number, @Res() res: Response){
        try {
            const deleteAttendance = await this.attendanceService.deleteAttendance(Number(id));
            return res.json({
                success: true,
                message: 'Attendance deleted'
            }) 
        } catch (error: any) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                throw PrismaErrorHandling(error);
            }
            throw new HttpException(error.message || 'Attendance deletion failed', error.status || 500);
        }
        }
}
