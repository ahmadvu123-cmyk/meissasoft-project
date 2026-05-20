import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    let res;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      res = exception.getResponse();

      message = res.message || res || 'Error'; // if res is a string then it will save in message

    }

    if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      message,
    })
  }
}
